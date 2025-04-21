import { AppDataSource } from '../db/config';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import request from 'supertest';
import app from '../app';
import { Like } from 'typeorm';

const TEST_PREFIX = 'Jest_test_';

describe('Article Endpoints', () => {
  let testTag1: Tag;
  let testTag2: Tag;
  let testArticle: Article;

  beforeAll(async () => {
    // Create test tags
    const tagRepository = AppDataSource.getRepository(Tag);
    testTag1 = await tagRepository.save({ name: `${TEST_PREFIX}Tag 1` });
    testTag2 = await tagRepository.save({ name: `${TEST_PREFIX}Tag 2` });
  });

  afterAll(async () => {
    // Clean up test data
    const articleRepository = AppDataSource.getRepository(Article);
    const tagRepository = AppDataSource.getRepository(Tag);
    
    // Only delete articles and tags with the test prefix
    await articleRepository.delete({ title: Like(`${TEST_PREFIX}%`) });
    await tagRepository.delete({ name: Like(`${TEST_PREFIX}%`) });
  });

  describe('POST /api/articles', () => {
    it('should create an article without tags', async () => {
      const response = await request(app)
        .post('/api/articles')
        .send({
          title: `${TEST_PREFIX}Article`,
          content: 'This is a test article content',
          published: true
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(`${TEST_PREFIX}Article`);
      expect(response.body.slug).toBe('jest-test-article');
      expect(response.body.content).toBe('This is a test article content');
      expect(response.body.published).toBe(true);
      expect(response.body.tags).toHaveLength(0);

      testArticle = response.body;
    });

    it('should create an article with tags', async () => {
      const response = await request(app)
        .post('/api/articles')
        .send({
          title: `${TEST_PREFIX}Article with Tags`,
          content: 'This is a test article with tags',
          published: true,
          tagIds: [testTag1.id, testTag2.id]
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(`${TEST_PREFIX}Article with Tags`);
      expect(response.body.slug).toBe('jest-test-article-with-tags');
      expect(response.body.tags).toHaveLength(2);
      expect(response.body.tags.map((tag: Tag) => tag.id)).toContain(testTag1.id);
      expect(response.body.tags.map((tag: Tag) => tag.id)).toContain(testTag2.id);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/articles')
        .send({
          content: 'Test content' // Missing required title
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'title',
            message: expect.any(String)
          })
        ])
      );
    });
  });

  describe('GET /api/articles/:slug', () => {
    it('should get an article by slug', async () => {
      const response = await request(app)
        .get(`/api/articles/${testArticle.slug}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testArticle.id);
      expect(response.body.title).toBe(testArticle.title);
    });

    it('should return 404 for non-existent article slug', async () => {
      const response = await request(app)
        .get('/api/articles/non-existent-article');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('should update article content and tags', async () => {
      const response = await request(app)
        .put(`/api/articles/${testArticle.id}`)
        .send({
          content: 'Updated content',
          tagIds: [testTag1.id]
        });

      expect(response.status).toBe(200);
      expect(response.body.content).toBe('Updated content');
      expect(response.body.tags).toHaveLength(1);
      expect(response.body.tags[0].id).toBe(testTag1.id);
    });

    it('should update article title and generate new slug', async () => {
      const response = await request(app)
        .put(`/api/articles/${testArticle.id}`)
        .send({
          title: `${TEST_PREFIX}New Article Title`
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(`${TEST_PREFIX}New Article Title`);
      expect(response.body.slug).toBe('jest-test-new-article-title');
    });

    it('should return 404 for non-existent article id', async () => {
      const response = await request(app)
        .put('/api/articles/00000000-0000-0000-0000-000000000000')
        .send({
          title: 'New Title'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('should delete an article', async () => {
      const response = await request(app)
        .delete(`/api/articles/${testArticle.id}`);

      expect(response.status).toBe(204);

      // Verify article is deleted
      const articleRepository = AppDataSource.getRepository(Article);
      const deletedArticle = await articleRepository.findOne({
        where: { id: testArticle.id }
      });
      expect(deletedArticle).toBeNull();
    });

    it('should return 404 for non-existent article id', async () => {
      const response = await request(app)
        .delete('/api/articles/00000000-0000-0000-0000-000000000000');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });
  });
}); 