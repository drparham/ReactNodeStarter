/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to create an article
     * @example cy.createArticle({ title: 'Test Article', content: 'Test Content' })
     */
    createArticle(article: Partial<Article>): Chainable<Article>;
    
    /**
     * Custom command to create a tag
     * @example cy.createTag({ name: 'Test Tag' })
     */
    createTag(tag: Partial<Tag>): Chainable<Tag>;
    
    /**
     * Custom command to login
     * @example cy.login('username', 'password')
     */
    login(username: string, password: string): Chainable<void>;
  }
} 