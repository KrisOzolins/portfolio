// server/tests/api.test.js
const request = require('supertest');
const { server, app } = require('../');
const { db } = require('./setup');
const config = require('../config');

beforeAll(async () => {
  console.log(`${__filename} beforeAll`);

  // Mock stuff here.
  // ...

  // Prepare the database before running tests.
  // await db.sequelize.sync({ alter: true });
  // await db.seed();

  // Start the server.
  // server.listen(config.port);
});

afterAll(async () => {
  console.log(`${__filename} afterAll`);

  await db.sequelize.close(); // Close the database connection after tests.
  await db.redisClient.disconnect(); // Close the Redis connection after tests.

  server.close(); // Ensure the server is closed after all tests.
});

describe('TEST /api/*', () => {
  // beforeAll((done) => {
  //   done();
  // });

  // afterAll((done) => {
  //   done();
  // });

  it('should return the correct response', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to the API.' });
  });

  it('should return a 404 for a non-existing endpoint', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.statusCode).toBe(404);
  });
});

describe('TEST /api/users/*', () => {
  // it('should return a list of users', async () => {
  //   const data = await User.findAll();
  //   expect(data).toHaveLength(2);
  //   // const response = await request(app).get('/api/test-users');
  //   // expect(response.statusCode).toBe(200);
  //   // expect(response.body).toHaveLength(2);
  //   // expect(response.body[0]).toHaveProperty('name', 'John Doe');
  // });

  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    // expect(response.body[0]).toHaveProperty('name', 'John Doe');
    expect(response.body[0]).toHaveProperty('email', 'kris.ozolins@gmail.com');
  });

  describe('POST /api/users/login', () => {
    it('should authenticate a user', async () => {
      // const userData = { email: 'john@example.com', password: 'password', userAgent: 'Test user agent' };
      const userData = { email: 'kris.ozolins@gmail.com', password: 'test', userAgent: 'Test user agent' };
      const response = await request(app)
        .post('/api/users/login')
        // .set('Accept', 'application/json')
        .send(userData);
      // console.log('Response:', response.body);
      expect(response.statusCode).toBe(200);
      // expect(response.body).toHaveProperty('jwt');
    });
  });
});

describe('Post Controller Endpoints', () => {
  describe('GET /posts/count', () => {
    it('should return the count of posts', async () => {
      const response = await request(app).get('/api/posts/count');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('GET /posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /posts/tags', () => {
    it('should return a list of tags', async () => {
      const response = await request(app).get('/api/posts/tags');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  // Add more tests for POST /posts, GET /posts/:id, PUT /posts/:id, DELETE /posts/:id, etc.
});

// describe('Comment Controller Endpoints', () => {
//   describe('POST /posts/:id/comments', () => {
//     it('should create a comment for a post', async () => {
//       const postId = 1; // Assuming this post ID exists
//       const commentData = { text: 'Great post!' };
//       const response = await request(app).post(`/api/posts/${postId}/comments`).send(commentData);
//       expect(response.statusCode).toBe(201);
//       expect(response.body).toHaveProperty('id');
//     });
//   });

//   // Add more tests for GET /posts/:id/comments, GET /posts/:id/comments/:commentId, etc.
// });
