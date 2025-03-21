// backend/functions/auth.js
import express from 'express';
import { login, logout, signup } from '../../controllers/auth.controller.js';

const app = express();

app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);

exports.handler = async (event, context) => {
  const request = {
    method: event.httpMethod,
    body: JSON.parse(event.body || '{}'),
    params: event.pathParameters,
    query: event.queryStringParameters,
    headers: event.headers,
  };

  const response = await app.request(request);

  return {
    statusCode: response.statusCode,
    headers: response.headers,
    body: JSON.stringify(response.body),
  };
};