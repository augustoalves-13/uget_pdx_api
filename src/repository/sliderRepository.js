import con from "./connection.js"

export async function PostInSlider(info){
  const command =   
  `
  insert into tb_slider(ds_title, ds_txt)
              values(?,?)
  `
  const resp = await con.query(command, [
    info.title,
    info.txt,
  ])
  const response = resp[0]
  info.id = response.insertId

  return info
}

export async function UploadSliderImage( img, id ){
  const command = 
  `
  update tb_slider
     set ds_image         = ?
   where id_slider   = ?
  `
  const [resp] = await con.query(command, [img, id])
  return resp.affectedRows
}

export async function UploadVisualImage(id, image){
  const command = 
  `
  update tb_slider
     set ds_image         = ?
   where id_slider        = ?
  `
  const [resp] = await con.query(command, [image, id])
  return resp.affectedRows
}

export async function GetProductsSlider(){
  const command = 
  `
    select id_slider    id,
           ds_image     image,
           ds_title     title,
           ds_txt       text
      from tb_slider   
  `
  const [lines] = await con.query(command)
  return lines
}