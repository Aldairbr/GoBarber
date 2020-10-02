import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import userController from './app/controllers/userController'
import sessionController from './app/controllers/sessionController'
import fileController from './app/controllers/fileController'
import providerController from './app/controllers/providerController'

import authMidleware from './app/midlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

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

routes.get('/providers', providerController.index)

routes.post('/files', upload.single('file'), fileController.store)

export default routes
