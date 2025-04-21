import React from 'react';
import Article from '../../src/components/Article';

describe('Article Component', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    content: 'This is a test article content',
    published: true,
    tags: [
      { id: '1', name: 'Test Tag 1' },
      { id: '2', name: 'Test Tag 2' },
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
  };

  it('should render the article title', () => {
    cy.mount(<Article article={mockArticle} />);
    cy.get('h2').should('contain', mockArticle.title);
  });

  it('should render the article content', () => {
    cy.mount(<Article article={mockArticle} />);
    cy.get('p').should('contain', mockArticle.content);
  });

  it('should render all tags', () => {
    cy.mount(<Article article={mockArticle} />);
    mockArticle.tags.forEach((tag) => {
      cy.get('span').should('contain', tag.name);
    });
  });
}); 