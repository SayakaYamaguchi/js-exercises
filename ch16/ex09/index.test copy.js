import request from 'supertest';
import app from './index.mjs'; // Expressアプリケーションをインポート

describe('GET /test/mirror', () => {
  it('should respond with the same request data', async () => {
    const response = await request(app)
      .get('/test/mirror')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.text).toContain('GET /test/mirror');
  });
});

describe('GET /nonexistent', () => {
  it('should return 404 for nonexistent files', async () => {
    const response = await request(app)
      .get('/nonexistent');

    expect(response.status).toBe(404);
    expect(response.text).toContain('File not found');
  });
});