import con from "./connection.js"

export async function RegisterProduct(product){
  const command = 
  `
    insert into tb_home (ds_titulo, ds_texto)
                  values(?, ?)
  `   
  const resp = await con.query(command, [product.title, product.text])
  const info = resp[0]
  product.id = info.insertId

  return product
}

export async function RegisterImage(image, id){
  const command = 
  `
  update tb_home
     set img_banner    = ?
   where id_home       = ?
  `
  const [resp]= await con.query(command, [image, id])
  return resp.affectedRows
}

export async function ListProducts(){
  const command = 
  `
    select id_home      id,
           ds_titulo    title,
           ds_texto     text,
           img_banner   img
      from tb_home     
  `
  const [lines] = await con.query(command)
  return lines
}

export async function UpdateProducts( id, product ){
  const command = 
  `
  update tb_home
     set ds_titulo     = ?,
         ds_texto      = ? 
   where id_home       = ?
  `
  const [resp] = await con.query(command, [product.title, product.text, id])
  return resp.affectedRows
}

export async function ListProductFromId(id){
  const command = 
  `
  select id_home      id,
         ds_titulo    title,
         ds_texto     text,
         img_banner   img
    from tb_home 
   where id_home    =  ?  
  `

  const [lines] = await con.query(command, [id])
  return lines[0]
}

export async function PostInSlider(info){
  const command = 
  `
  insert into tb_slider(ds_title, ds_txt)
              values(?,?)
  `
  const resp = await con.query(command, [
    info.title,
    info.txt,
    info.background
  ])
  const response = resp[0]
  info.id = response.insertId

  return info
}
