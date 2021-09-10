require('dotenv/config');
const express = require('express');
const pg = require('pg');
const ClientError = require('./client-error');
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

app.get('/api/recordings', (req, res, next) => {
  const sql = `
  select *
  from "recordings"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/recordings', (req, res, next) => {
  const { userId, url, title, recordingLength } = req.body;
  if (!userId || !url || !title || !recordingLength) {
    throw new ClientError(400, 'bad request');
  }
  const params = [userId, url, title, recordingLength];
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
