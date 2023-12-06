import { Router } from 'express'
import { ListAdm, LoginAdm, RegisterAdm } from '../repository/adminRepository.js'

const server = Router()

server.post('/admin/cadastrar', async (req, resp) => {
  try {
    const request = req.body
    if (!request.name)
      throw new Error('Informe o nome do adm')

    if (!request.username || request.username.length < 4)
      throw new Error('O nome de usuário deve conter pelo menos 4 caracteres')

    if(!request.password || request.password.length < 6 )
      throw new Error("A senha deve conter pelo menos 6 caracteres")

    const response = await RegisterAdm(request)
    resp.send(response)

  } catch (err) {
    resp.status(401).send({
      erro: err.message
    })
  }
})

server.post('/admin/login', async (req, resp) => {
  try {
    const {username, password} = req.body
    const response = await LoginAdm(username, password)

    if(!response)
      throw new Error('Credenciais Inválidas')
    else 
      resp.send(response)

  } catch (err) {
    resp.status(401).send({
      erro: err.message
    })
  }
})

server.get('/admin', async (req, resp) => {
  try {
    const response = await ListAdm()
    resp.send(response)

  } catch (err) {
    resp.status(404).send({
      erro: err.message
    })
  }
})

export default server