context('Hero Block', () => {
	before(() => {
		cy.login()
	})

	it('adds a hero block', () => {
		cy.visit(Cypress.env('host') + '/wp-admin/post-new.php')

		cy.get('.components-modal__screen-overlay').then(($el) => {
			if (Cypress.dom.isVisible($el)) {
				cy.get($el).click({ force: true })
			}
		})

		cy.get('.block-editor-inserter__toggle').first().click()
		cy.get('#block-editor-inserter__search-1').type('hero')
		cy.get('.editor-block-list-item-mwp-hero').click()
		cy.get('[data-type="mwp/hero"]').should('exist').should('be.visible')
	})

	it('adds a title and tagline', () => {
		const title = 'Hello world'
		const tagline = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

		cy.get('#hero-title').type(title)
		cy.get('#hero-tagline').type(tagline)
		cy.get('#post-title-1').click()
		cy.get('.wp-block-mwp-hero').should('exist').should('be.visible')
		cy.get('.wp-block-mwp-hero h2').invoke('text').should('eq', title)
		cy.get('.wp-block-mwp-hero p').invoke('text').should('eq', tagline)
	})
})
