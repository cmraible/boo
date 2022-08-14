describe('Comments', () => {
  it('renders properly', () => {
    cy.visit('http://localhost:3000/posts/1')
    cy.contains('The best blog post ever!')
    cy.contains('Here is some awesome content.')
    cy.contains('Discussion')
    cy.contains('Comment')
    cy.contains('Rob Hope')
    cy.contains('Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I\'ll be recommending then...')
    cy.contains('Upvote')
    cy.contains('Reply')
  })

  it('adds comments successfully', () => {
    cy.exec('npx prisma migrate reset -f')
    cy.visit('http://localhost:3000/posts/1')
    cy.get('#comment-input').type('This is a fake comment.')
    cy.get('#comment-form').submit()
    cy.contains('This is a fake comment.')
  })

  it('validates input', () => {
    cy.exec('npx prisma migrate reset -f')
    cy.visit('http://localhost:3000/posts/1')
    cy.contains('Comment').click()
    cy.get('#comment-input').invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
    cy.get('#comment-input').type('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    cy.contains('Comment').click()
    cy.contains('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  })

  it('upvotes successfully', () => {
    cy.exec('npx prisma migrate reset -f')
    cy.visit('http://localhost:3000/posts/1')
    cy.contains('Upvote').click()
    cy.contains('Upvoted')
  })

  it('reply focuses the input', () => {
    cy.visit('http://localhost:3000/posts/1')
    cy.contains('Reply').click()
    cy.focused().should('have.attr', 'id', 'comment-input')
  })

})