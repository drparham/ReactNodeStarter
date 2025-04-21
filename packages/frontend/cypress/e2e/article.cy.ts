import { Article, Tag } from '../../src/types';

describe('Article Page', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    slug: 'test-article',
    content: 'This is a detailed test article content with multiple paragraphs.\n\nSecond paragraph here.',
    published: true,
    tags: [
      { id: '1', name: 'Test' },
      { id: '2', name: 'Cypress' }
    ],
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  beforeEach(() => {
    // Mock the API response for a single article
    cy.intercept('GET', '/api/articles/test-article', {
      statusCode: 200,
      body: mockArticle
    }).as('getArticle');
  });

  it('should display loading state', () => {
    // Delay the API response to see loading state
    cy.intercept('GET', '/api/articles/test-article', (req) => {
      req.reply({
        delay: 1000,
        body: mockArticle
      });
    }).as('getDelayedArticle');

    cy.visit('/article/test-article');
    cy.get('.MuiCircularProgress-root').should('be.visible');
  });

  it('should display article content correctly', () => {
    cy.visit('/article/test-article');
    cy.wait('@getArticle');

    // Check title
    cy.get('h1').contains('Test Article').should('be.visible');

    // Check tags
    cy.get('.MuiChip-root').should('have.length', 2);
    cy.contains('.MuiChip-root', 'Test').should('be.visible');
    cy.contains('.MuiChip-root', 'Cypress').should('be.visible');

    // Check publish date
    cy.get('.MuiTypography-subtitle1')
      .contains(new Date('2024-01-01').toLocaleDateString())
      .should('be.visible');

    // Check content
    cy.get('.MuiTypography-body1')
      .contains('This is a detailed test article content')
      .should('be.visible');

    // Check back button
    cy.get('.MuiButton-root[href="/"]').should('be.visible');
  });

  it('should handle non-existent articles', () => {
    cy.intercept('GET', '/api/articles/non-existent', {
      statusCode: 404,
      body: { message: 'Error loading article' }
    }).as('getNonExistentArticle');

    cy.visit('/article/non-existent');
    cy.wait('@getNonExistentArticle');

    cy.get('.MuiTypography-root')
      .contains('Error loading article')
      .should('be.visible');
  });

  it('should navigate back to home page', () => {
    cy.visit('/article/test-article');
    cy.wait('@getArticle');

    cy.get('.MuiButton-root[href="/"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
}); 