require('dotenv/config');
const express = require('express');
const argon2 = require('argon2');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadRecordingsMiddleware = require('./recordings-middleware');
const S3 = require('aws-sdk/clients/s3');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const Bucket = process.env.AWS_S3_BUCKET;
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET
});
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/recordings/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!userId || userId < 1) {
    throw new ClientError(400, 'please enter a valid userId');
  }
  const sql = `
  select *
  from "recordings"
  where "userId" = ${userId}
  order by "recordingId" desc
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/notes', (req, res, next) => {
  const sql = `
  select *
  from "notes"
  order by "frequency" asc
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));

});

app.delete('/api/recordings/:id', (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    throw new ClientError(400, 'bad request');
  }
  const params = [id];
  const sql = `
  delete from "recordings"
  where "recordingId" = $1
  returning *
  `;
  db.query(sql, params)
    .then(result => {
      if (result.rows[0]) {
        let deleteKey = result.rows[0].url.split('/');
        deleteKey = deleteKey[deleteKey.length - 1];
        const s3Params = {
          Bucket,
          Key: deleteKey
        };
        s3.deleteObject(s3Params).promise();
        res.status(204).json();
      } else {
        throw new ClientError(404, 'Request not available');
      }
    })
    .catch(err => next(err));
});

app.post('/api/recordings', uploadRecordingsMiddleware, (req, res, next) => {
  const { userId, title, recordingLength } = req.body;
  if (!userId || !title || !recordingLength) {
    throw new ClientError(400, 'bad request');
  }
  const recordingUrl = req.file.location;
  const params = [userId, recordingUrl, title, recordingLength, false];
  const sql = `
  insert into "recordings" ("userId", "url", "title", "recordingLength", "favorite")
  values ($1, $2, $3, $4, $5)
  returning *`;
  db.query(sql, params)
    .then(result => {
      const recording = result.rows;
      res.status(201).json(recording);
    })
    .catch(err => next(err));
});

app.patch('/api/recordings/:recordingId', (req, res, next) => {
  const { recordingId } = req.params;
  const { isFavorite } = req.body;
  if (isNaN(recordingId) || typeof isFavorite !== 'boolean') {
    throw new ClientError(400, 'bad request');
  }
  const params = [isFavorite, recordingId];
  const sql = `
  update "recordings"
  set "favorite" = $1
  where "recordingId" = $2
  returning *
  `;
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashPassword")
      values($1, $2)
      returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.sendStatus(201).json(user);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
