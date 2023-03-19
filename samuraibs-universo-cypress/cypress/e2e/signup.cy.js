import signupPage from '../support/pages/signup/'
describe('Valida pagina de cadastro', () => {

    context('quando o email nao existe', () => {
        const user = {
            name: 'Gabriel Araujo',
            email: 'gabriel@testes.com',
            password: 'Senha@123'
        }
        before(() => {
            cy.task('removeUser', user.email).then(function (result) {
                console.log(result)
            })
        })

        it('deve cadastrar com sucesso', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o email ja existe', () => {
        const user = {
            name: 'Gabriel Araujo',
            email: 'gabriel@testes.com',
            password: 'Senha@123',
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email).then(function (result) {
                console.log(result)
            })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('nao deve realizar o cadastro', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

            /* Expressoes regulares 
                ^ - Comeca com
                $ - Termina com 
                * - Contem
            */
        })
    })

    context('quando o email e incorreto', () => {
        const user = {
            name: 'Leo Pele',
            email: 'leo.pele.com',
            password: 'Senha@123',
        }

        it('deve exibir a mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha tem menos que 6 caracteres', () => {
        const passwords = ['1', '1a', '1ab', '1abc', '12fa@']

        beforeEach(() => {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('nao deve cadastrar com a senha: ' + p, () => {

                const user = {
                    name: 'Leo Pele',
                    email: 'leo@pele.com',
                    password: p
                }
                signupPage.form(user)
                signupPage.submit()

            })
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context.only('quando nao preencho nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.go()
                signupPage.submit()
                signupPage.alertHaveText(alert)
            })
        })
    })
})