import { AxiosAdapter } from './axios.adapter';

export const movieDBFetcher = new AxiosAdapter( {
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '7e906cea346dc8399004fa25750d44ed',
    language: 'es',
  },
} );
