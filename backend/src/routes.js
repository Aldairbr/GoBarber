import { Router } from 'express'

import userController from './app/controllers/userController'
import sessionController from './app/controllers/sessionController'

import authMidleware from './app/midlewares/auth'

const routes = new Router()

routes.post('/users', userController.store)
routes.get('/users', userController.index)
routes.get('/users/:id', userController.show)
routes.post('/sessions', sessionController.store)

routes.use(authMidleware)//midleware vai pegar de maneira global todas as rotas
                        //abaixo dessa linha. Poderia por direto na rota
                        //ex:
                        //routes.put(
                        // '/users', authMidleware userController.update)

routes.put('/users', userController.update)

export default routes
