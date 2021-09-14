require('dotenv/config');
const express = require('express');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadRecordingsMiddleware = require('./recordings-middleware');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

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

      if (!result.rows[0]) {
        throw new ClientError(404, 'userId not available');
      }
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/recordings', uploadRecordingsMiddleware, (req, res, next) => {
  const { userId, title, recordingLength } = req.body;
  if (!userId || !title || !recordingLength) {
    throw new ClientError(400, 'bad request');
  }
  const recordingUrl = `/voice/${req.file.filename}`;
  const params = [userId, recordingUrl, title, recordingLength];
  const sql = `
  insert into "recordings" ("userId", "url", "title", "recordingLength")
  values ($1, $2, $3, $4)
  returning *`;
  db.query(sql, params)
    .then(result => {
      const recording = result.rows;
      res.status(201).json(recording);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
