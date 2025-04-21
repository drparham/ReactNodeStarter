import { Article, Tag } from '../../src/types';

describe('Home Page', () => {
  beforeEach(() => {
    // Mock the API response
    cy.intercept('GET', '/api/articles', {
      statusCode: 200,
      body: [
        {
          id: '1',
          title: 'Test Article',
          slug: 'test-article',
          content: 'This is a test article content.',
          published: true,
          tags: [
            { id: '1', name: 'Test' },
            { id: '2', name: 'Cypress' },
          ],
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    }).as('getArticles');

    cy.visit('/');
  });

  it('should display the page header', () => {
    cy.contains('h1', 'Latest Articles').should('be.visible');
  });

  it('should display navigation links', () => {
    cy.get('.MuiToolbar-root').within(() => {
      cy.contains('a', 'Home').should('be.visible');
      cy.contains('a', 'Admin').should('be.visible');
    });
  });

  it('should display articles', () => {
    cy.get('.MuiCard-root').should('have.length.at.least', 1);
    cy.get('.MuiCard-root').first().within(() => {
      cy.contains('h2', 'Test Article').should('be.visible');
      cy.contains('.MuiTypography-body1', 'This is a test article content.').should('be.visible');
      cy.get('.MuiChip-root').should('have.length', 2);
      cy.contains('.MuiChip-root', 'Test').should('be.visible');
      cy.contains('.MuiChip-root', 'Cypress').should('be.visible');
    });
  });

  it('should navigate when clicking Read More', () => {
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('.MuiButton-root').contains('Read More').click();
    });
    cy.url().should('include', '/article/test-article');
  });
}); 