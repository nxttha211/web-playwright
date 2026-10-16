// Values can be overridden with environment variables, e.g. BASE_URL=https://staging.example.com npx playwright test
export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  apiUrl: process.env.API_URL ?? 'https://dummyjson.com',
};

export const AUTH_FILE = '.auth/standard-user.json';
