import {el} from './elements'
class Header {
    userLoggedIn(user) {
        cy.get(el.fullName, { timeout: 7000 }).should('have.text', user.name)
    }
}

export default new Header()