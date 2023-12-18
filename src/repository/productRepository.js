import con from "./connection.js"

export async function RegisterProductItem(product){
    const command = 
    `
        insert into tb_product(
            nm_product_name,
            ds_resumo,
            ds_slogan,
            ds_device_descricao,
            bl_types
        )
        values(?,?,?,?,?)
    ` 

    const r = [
        product.name,
        product.resumo,
        product.slogan,
        product.descricaoDevice,
        product.tipos
    ]

    const resp = await con.query(command, r)
    const info = resp[0]
    product.id = info.insertId

    return product
}


export async function SaveImagens(idProduto, imagem){
    const command = 
    `
    insert into tb_produto_imagem(id_produto, img_imagem)
                            values(?,?)
    `
    const [resp] = await con.query(command, [idProduto , imagem])
}


export async function ListProductItem(){    
    const command = 
    `
        select  id_product              id,
                nm_product_name         name,
                ds_resumo               resumo,
                img_device_principal    imgPrincipal,
                img_device_secundario   imgSecundaria,
                ds_slogan               slogan,
                img_device              imgDevice,
                ds_device_descricao     deviceDescricao,
                bl_types                tipos
           from tb_product
    `
    const [lines] = await con.query(command)
    return lines
}

export async function ListProductItemById(id){
    const command = 
    `
    select  id_product              id,
            nm_product_name         name,
            ds_resumo               resumo,
            img_device_principal    imgPrincipal,
            img_device_secundario   imgSecundaria,
            ds_slogan               slogan,
            img_device              imgDevice,
            ds_device_descricao     deviceDescricao,
            bl_types                tipos
       from tb_product
      where id_product      =       ? 
    `
    const [lines] = await con.query(command, [id])
    return lines[0]
} 

export async function GetProductsImageById(id){
    const command = 
    `
        select  id_produto_imagem       id,
                id_produto              idProduto,
                img_imagem              img
           from tb_produto_imagem
          where id_produto          =   ? 
    `
    const [lines] = await con.query(command, [id])
    return lines
}