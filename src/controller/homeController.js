import { Router } from 'express'
import multer from 'multer'
import { ListProducts, RegisterImage, RegisterProduct, UpdateProducts } from '../repository/homeRepository.js'

const upload = multer({ dest: 'storage/capas' })

const server = Router()

server.post('/api/produtos/cadastrar', async (req, resp) => {
  try {
    const request = req.body

    if (!request.title)
      throw new Error('Informe o nome do produto')

    if (!request.text)
      throw new Error("Informe uma descrição do produto")

    const response = await RegisterProduct(request)
    resp.send(response)

  } catch (err) {
    resp.status(401).send({
      erro: err.message
    })
  }
})


server.put("/api/produtos/:id/image", upload.single('capa'), async (req, resp) => {
  try {
    const { id } = req.params
    const image = req.file.path

    const response = await RegisterImage(image, id)
    if (response != 1)
      throw new Error("A imagem não pode ser inserida")

    resp.status(204).send()

  } catch (err) {
    resp.send(400).send({
      erro: err.message
    })
  }
})


server.get('/api/produtos', async (req, resp) => {
  try {
    const response = await ListProducts()
    if (!response) {
      throw new Error("Nenhum Produto foi cadastrado")
    } else {
      resp.send(response)
    }

  } catch (err) {
    resp.status(404).send({
      erro: err.message
    })
  }
})


server.put('/api/produtos/:id', async (req, resp) => {
  try {
    const { id } = req.params
    const request = req.body

    if (!request.title)
      throw new Error('Informe o nome do produto')

    if (!request.text)
      throw new Error("Informe uma descrição do produto")

    const response = await UpdateProducts(id, request)
    if (response != 1)
      throw new Error("O produto não pode ser alterado")
    else
      resp.status(204).send()

  } catch (err) {
    resp.status(404).send({
      erro: err.message
    })
  }
})

export default server