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
            cy.visit('/signup')

            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)

            cy.get('button[type="submit"]').click()
            cy.get('.toast').should('be.visible').find('p').should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando o email ja existe', ()=>{
        const user = {
            name: 'Gabriel Araujo',
            email: 'gabriel@testes.com',
            password: 'Senha@123',
            is_provider: true
        }

        before(()=>{
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

            cy.visit('/signup')
    
            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)
    
    
            cy.get('button[type="submit"]').click()
    
            cy.get('.toast').should('be.visible').find('p').should('have.text', 'Email já cadastrado para outro usuário.')
    
        })
    })
    
})