describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the page header', () => {
    cy.get('h1').should('exist');
  });

  it('should display navigation links', () => {
    cy.get('a[href="/"]').should('exist');
    cy.get('a[href="/admin"]').should('exist');
  });

  it('should load and display articles', () => {
    // First verify loading state
    cy.contains('Loading...').should('exist');

    // Then verify articles are loaded
    cy.get('.MuiCard-root').should('exist');
    
    // Verify article structure
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('h2').should('exist'); // Title exists
      cy.get('.MuiChip-root').should('exist'); // Tags exist
      cy.get('button').contains('Read More').should('exist');
    });
  });

  it('should navigate when clicking Read More', () => {
    // Get the first article's title
    let articleTitle = '';
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('h2').invoke('text').then((text) => {
        articleTitle = text;
      });
    });

    // Click Read More
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('button').contains('Read More').click();
    });

    // Verify URL changed to an article route with a slug
    cy.url().should('match', /\/article\/[a-z0-9-]+/);
    
    // Verify the slug in the URL matches the article title
    cy.url().then((url) => {
      const slug = url.split('/').pop();
      const expectedSlug = articleTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      expect(slug).to.equal(expectedSlug);
    });
  });
}); 