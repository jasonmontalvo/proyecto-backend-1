const {request, response} = require('express');
const narmodels = require('../models/clientes');
const pool=require('../db');


const listcliente = async (req = request, res = response) => {
  
    let conn;
    try {
      conn = await pool.getConnection();
      const cliente = await conn.query(narmodels.getAll);
      res.json(cliente);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json(error);
    } finally {
      if (conn) conn.end();
    }
    
    
}

const listncbyid = async (req = request, res = response) => {
    
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    } 

    let conn; 
    try{
        conn = await pool.getConnection();

    const [cliente] = await conn.query (narmodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!cliente) {
        res.status(404).json({msg: 'User not foud'});
        return;
    }
    
    
    res.json(cliente);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}





const addcliente =async(req = request, res= response)=>{
    let conn;
    const {
        id,
        nombre,
        apellido,
        activo,
        servicio
    } = req.body;
    if (!id|| !nombre|| !apellido|| !activo || !servicio){
res.status(400).json({msg:'Missing informarion'});
return;
        }
       

        const clientes= [id,
            nombre,
            apellido,
            activo,
            servicio]

       
    
    try {

        conn = await pool.getConnection();
        
        const [Narname] = await conn.query(
            narmodels.getByName,
            [nombre],
            (err) => {if (err) throw err;}
        );
        if (Narname){
            res.status(409).json({msg:`Cliente con el nombre ${nombre} ya existe`});
            return;
        }
        
        const clienteAdded = await conn.query(narmodels.addRow,[...clientes],(err)=>{

        })
        
        if (clienteAdded.affecteRows === 0) throw new Error ({msg:'fallo al agregar cliente'});
        res.json({msg:'cliente agregado correctamente'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Update del profe Julio 

const updateCliente=async(req = request, res= response)=>{
    const {
        
        nombre,
        apellido,
        activo,
        servicio
    } = req.body;

const {id} = req.params;
let newUserData=[
    
        id,
        nombre,
        apellido,
        activo,
        servicio
];
let conn;
try{
    conn = await pool.getConnection();
const [clienteExists]=await conn.query(
    narmodels.getByID,
    [id],
    (err) => {if (err) throw err;}
);
if (!clienteExists ){
    res.status(404).json({msg:'Cliente no encontrado'});
    return;
}

const [usernamecliente] = await conn.query(
    narmodels.getByName,
    [nombre],
    (err) => {if (err) throw err;}
);
if (usernamecliente){
    res.status(409).json({msg:`Cliente con el nombre ${nombre} ya existe`});
    return;
}


const oldUserData = [
        clienteExists.nc,
        clienteExists.nombre,
        clienteExists.apellido,
        clienteExists.activo,
        clienteExists.servicio
];

newUserData.forEach((clienteData, index)=> {
    if (!clienteData){
        newUserData[index] = oldUserData[index];
    }
})

const clienteUpdate = await conn.query(
    narmodels.updateROw,
    [...newUserData, id],
    (err) => {if (err) throw err;}
);
if(clienteUpdate.affecteRows === 0){
    throw new Error ('cliente no actualizado');
}
res.json({msg:'cliente actualizado'})
}catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteCliente = async (req = request, res= response)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const {id} =req.params;
        const [clienteExists] =await conn.query(
            narmodels.getByID,
            [id],
            (err) => {if (err) throw err;}
        );
        if(!clienteExists){
            res.status(404).json({msg:'Hero not Found'});
            return;
        }

        const userDelete = await conn.query(
            narmodels.deleteRow,
            [id],
            (err) => {if(err)throw err;}
        );
        if (userDelete.affecteRows===0){
            throw new Error({msg:'error al elimninar'})
        };
        res.json({msg:'eliminado'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }finally{
       if(conn) conn.end(); 
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////


module.exports={listcliente, listncbyid, addcliente, updateCliente, deleteCliente};