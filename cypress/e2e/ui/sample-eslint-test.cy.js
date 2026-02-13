describe.skip('Test with ESLint warning and error', () => {
  it.only('Is set to .only and has .wait', () => {
    console.log('Running eslint-test-cy.js');
    cy.visit('/');
    cy.wait(2000);
  });
});
