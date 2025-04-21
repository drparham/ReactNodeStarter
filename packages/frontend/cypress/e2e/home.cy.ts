import { Article, Tag } from '../../src/types';

describe('Home Page', () => {
  beforeEach(() => {
    // Mock the API response with a generic article
    cy.intercept('GET', '/api/articles', {
      statusCode: 200,
      body: [
        {
          id: '1',
          title: 'Sample Article',
          slug: 'sample-article',
          content: 'Sample article content for testing.',
          published: true,
          tags: [
            { id: '1', name: 'Tag1' },
            { id: '2', name: 'Tag2' },
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

  it('should display article cards with expected structure', () => {
    cy.get('.MuiCard-root').should('have.length.at.least', 1);
    cy.get('.MuiCard-root').first().within(() => {
      // Check for title element
      cy.get('h2').should('be.visible');
      // Check for content element
      cy.get('.MuiTypography-body1').should('be.visible');
      // Check for tags container
      cy.get('.MuiChip-root').should('have.length.at.least', 1);
      // Check for Read More button
      cy.get('.MuiButton-root').contains('Read More').should('be.visible');
    });
  });

  it('should navigate to article page when clicking Read More', () => {
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('.MuiButton-root').contains('Read More').click();
    });
    // Verify we're on an article page
    cy.url().should('include', '/article/');
  });
}); 