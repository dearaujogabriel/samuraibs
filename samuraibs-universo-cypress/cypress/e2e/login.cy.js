import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {
    
    context('quando o usuario e muito bom', () => {
        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'Senha@123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })


        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user)
        })
    })

    context('quando o usuario e bom, mas a senha e incorreta', () => {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'Senha@123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(() => {
                user.password = 'abc123'
            })

        })

        it('deve identificar erro de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)
        })
    })
})