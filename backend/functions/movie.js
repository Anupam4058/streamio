// backend/functions/movie.js
import express from 'express';
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory } from '../../controllers/movie.controller.js';

const app = express();

app.get('/trending', getTrendingMovie);
app.get('/:id/trailers', getMovieTrailers);
app.get('/:id/details', getMovieDetails);
app.get('/:id/similar', getSimilarMovies);
app.get('/:category', getMoviesByCategory);

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