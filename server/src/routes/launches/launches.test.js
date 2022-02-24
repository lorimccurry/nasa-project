const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST /launch', () => {
    const completeLaunchData = {
      mission: 'Save the world',
      rocket: 'USS Discovery NCC-1031',
      target: 'Kepler-62 f',
      launchDate: 'January 31, 3359',
    };

    const launchDataWithoutDate = {
      mission: 'Save the world',
      rocket: 'USS Discovery NCC-1031',
      target: 'Kepler-62 f',
    };

    const launchDataWithBadDate = {
      mission: 'Save the world',
      rocket: 'USS Discovery NCC-1031',
      target: 'Kepler-62 f',
      launchDate: 'nano nano',
    };

    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithBadDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date.',
      });
    });
  });
});
