const request = require('supertest');
const app = require('../server');

describe('Car Shop', () => {
  it('GET / returns 200 and shows cars with images', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('InnoCar Model 1');
    expect(res.text).toContain('InnoCar Model 2');
    expect(res.text).toContain('InnoCar Model 3');
    expect(res.text).toContain('/1.jpeg');
    expect(res.text).toContain('/2.jpeg');
    expect(res.text).toContain('/3.jpeg');
    expect(res.text).toContain('More Information');
    expect(res.text).not.toContain('price');
    expect(res.text).toContain('Three rows of seating with all-terrain traction control');
  });

  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/cars returns a list of cars', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
