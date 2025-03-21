// backend/functions/search.js
import express from 'express';
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from '../../controllers/search.controller.js';

const app = express();

app.get('/person/:query', searchPerson);
app.get('/movie/:query', searchMovie);
app.get('/tv/:query', searchTv);

app.get('/history', getSearchHistory);

app.delete('/history/:id', removeItemFromSearchHistory);

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