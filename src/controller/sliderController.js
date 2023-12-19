import { Router } from 'express'
import multer from 'multer'
import { PostInSlider } from '../repository/homeRepository.js'
import { GetProductsSlider, UploadSliderImage } from '../repository/sliderRepository.js'

const server = Router()
const upload = multer({dest: 'storage/slider'})




server.get('/api/slider/' , async(req, resp)=>{
  try {
    const response = await GetProductsSlider()
    
    if(!response){
      throw new Error('Nenhum Produto Aqui')
    } else{
      resp.send(response)
    }

  } catch (err) {
    resp.status(404).send()
  }
})




server.post('/api/slider/cadastrar' , async (req, resp) => {
  try {
    const request = req.body
    const response = await PostInSlider(request)

    resp.send(response)

  } catch (err) {
    resp.status(400).send({
      err:err.message
    })
  }
})

server.put('/api/slider/:id/image', upload.single('slider') , async (req , resp) => {
  try {
    const { id } = req.params
    const request = req.file.path

    
    const response = await UploadSliderImage(request , id)
    console.log(response)
    if(response != 1){
      throw new Error('A imagem não pode ser salva')
    } 
      resp.status(204).send()
    

  } catch (err) { 
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default server