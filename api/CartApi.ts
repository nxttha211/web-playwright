import { APIRequestContext } from '@playwright/test';

export class CartApi {
  constructor(private request: APIRequestContext) {}

  async getById(id: number) {
    return this.request.get(`/carts/${id}`);
  }
}
