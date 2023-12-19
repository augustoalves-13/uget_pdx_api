import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import homeController from './controller/homeController.js'
import adminController from './controller/adminController.js'
import productController from './controller/productController.js'
import sliderRepository from './controller/sliderController.js'

const Api = express()
Api.use(express.json())
Api.use(cors())

//liberar arquivos da storage
Api.use('/storage/capas', express.static("storage/capas"))
Api.use('/storage/produto', express.static("storage/produto"))

//endpoints
Api.use(sliderRepository)
Api.use(productController)
Api.use(adminController)
Api.use(homeController)

Api.listen(process.env.MYSQL_PORT,
  () => console.log('API ONLINE'))