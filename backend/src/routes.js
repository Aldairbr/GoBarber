import { Router } from 'express'

import userController from './app/controllers/userController'

import sessionController from './app/controllers/sessionController'

const routes = new Router()

routes.post('/users', userController.store)
routes.get('/users', userController.index)
routes.get('/users/:id', userController.show)

routes.post('/sessions', sessionController.store)

export default routes
