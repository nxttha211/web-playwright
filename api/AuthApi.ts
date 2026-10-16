import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {
    return this.request.post('/auth/login', { data: { username, password } });
  }

  async me(token: string) {
    return this.request.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  }
}
