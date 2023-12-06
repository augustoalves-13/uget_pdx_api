import con from "./connection.js"

export async function RegisterAdm(adm){
  const command = 
  `
    insert into tb_admin(nm_admin, ds_username, ds_senha)
                values(?, ?, ?)
  `
  const resp = await con.query(command , [adm.name, adm.username, adm.password])
  const info = resp[0]
  adm.id = info.insertId

  return adm
}

export async function LoginAdm(email, password){
  const command = 
  `
    select id_admin     id,
           nm_admin     name,
           ds_username  username
      from tb_admin 
     where ds_username = ?
       and ds_senha    = ?       
  `
  const [resp] = await con.query(command, [email, password])
  return resp[0]
}

export async function ListAdm(){
  const command = 
  `
  select id_admin     id,
         nm_admin     name,
         ds_username  username
    from tb_admin 
  `
  const [lines] = await con.query(command)
  return lines
} 