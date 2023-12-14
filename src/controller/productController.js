import { Router } from 'express'
import { ListProductItem, ListProductItemById, RegisterProductItem } from '../repository/productRepository.js'
import multer from 'multer'

const upload = multer({dest: ''})
const server = Router()

server.post('/api/produto/cadastrar' , async(req, resp) => {
    try {
        const request = req.body
        const response = await RegisterProductItem(request)

        resp.send(response)
    } catch (err) {
        resp.status(401).send({
            erro:err.message
        })
    }
})

server.get('/api/produto/' , async(req, resp)=>{
    try {
        const response = await ListProductItem()
        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})  

server.get('/api/produto/:id', async(req, resp) => {
    try {
        const {id} = req.params
        const response = await ListProductItemById(id)

        if(!response){
            throw new Error('Esse produto não existe')
        } else{
            resp.send(response)
        }

    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})

export default server