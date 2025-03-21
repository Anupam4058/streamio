// backend/functions/tv.js
import express from 'express';
import { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory } from '../../controllers/tv.controller.js';

const app = express();

app.get('/trending', getTrendingTv);
app.get('/:id/trailers', getTvTrailers);
app.get('/:id/details', getTvDetails);
app.get('/:id/similar', getSimilarTvs);
app.get('/:category', getTvsByCategory);

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