import { APIRequestContext } from '@playwright/test';

export class ProductApi {
  constructor(private request: APIRequestContext) {}

  async getById(id: number) {
    return this.request.get(`/products/${id}`);
  }

  async search(keyword: string) {
    return this.request.get('/products/search', { params: { q: keyword } });
  }
}
