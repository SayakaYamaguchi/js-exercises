import request from 'supertest';
import { describe, test, expect } from '@jest/globals';

describe('HTTP Server Tests', () => {

  test('GET / should return the form HTML', async () => {
    const response = await request('http://localhost:8080').get('/');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('<title>Greeting Form</title>');
    expect(response.text).toContain('<form action="/greeting" method="POST">');
  });

  test('POST /greeting should return greeting with name', async () => {
    const formData = { name: 'John', greeting: 'Hello' };
    const response = await request('http://localhost:8080')
      .post('/greeting')
      .type('form')  // application/x-www-form-urlencoded として送信
      .send(formData);  
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('<h1>Greeting Received</h1>');
    expect(response.text).toContain('<p>Name: John</p>');
    expect(response.text).toContain('<p>Greeting: Hello</p>');
  });
  test('Invalid path should return 404 Not Found', async () => {
    const response = await request('http://localhost:8080').get('/invalid-path');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('404 Not Found');
  });

  
  test('Invalid method should return 405 Method Not Allowed', async () => {
    const response = await request('http://localhost:8080').put('/');
    expect(response.statusCode).toBe(405);
    expect(response.text).toBe('405 Method Not Allowed');
  });
});
