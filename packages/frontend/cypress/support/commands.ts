import { Article, Tag } from '../../src/api';

declare global {
  namespace Cypress {
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
}

Cypress.Commands.add('createArticle', (article) => {
  return cy.request('POST', '/api/articles', article).then((response) => {
    return response.body;
  });
});

Cypress.Commands.add('createTag', (tag) => {
  return cy.request('POST', '/api/tags', tag).then((response) => {
    return response.body;
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', '/api/auth/login', { username, password }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
}); 