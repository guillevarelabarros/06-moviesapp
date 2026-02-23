import { AxiosAdapter } from './axios.adapter';

export const movieDBSearchFetcher = new AxiosAdapter( {
  baseUrl: 'https://api.themoviedb.org/3/search',
  params: {
    api_key: '7e906cea346dc8399004fa25750d44ed',
    language: 'es',
  },
} );
