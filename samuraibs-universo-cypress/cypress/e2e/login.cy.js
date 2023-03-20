import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
describe ('login', ()=>{
    context('quando o usuario e muito bom', ()=>{
        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            senha: 'Senha@123'
        }

        it('deve logar com sucesso', ()=>{
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user)
        })
    })
})