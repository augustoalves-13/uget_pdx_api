import { Router } from 'express'
import { GetProductsImageById, ListProductItem, ListProductItemById, RegisterProductItem, SaveImagens } from '../repository/productRepository.js'
import multer from 'multer'

const upload = multer({ dest: 'storage/produto' })
const server = Router()

server.post('/api/produto/cadastrar', async (req, resp) => {
    try {
        const request = req.body
        const response = await RegisterProductItem(request)

        const idProduct = response.id

        resp.send({
            id: idProduct
        })
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})


server.put('/admin/produto/:id', upload.array('imagens'), async (req, resp) => {
    try {
        const id = req.params.id
        const imagens = req.files

        for(const imagem of imagens){
            await SaveImagens(id, imagem.path)
        }

        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/api/produto/', async (req, resp) => {
    try {
        const response = await ListProductItem()
        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/api/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params
        const response = await ListProductItemById(id)

        if (!response) {
            throw new Error('Esse produto não existe')
        } else {
            resp.send(response)
        }

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/admin/produto/:id/imagens' , async(req, resp) => {
    try {
        const { id } = req.params 
        const response = await GetProductsImageById(id)

        resp.send(response)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server