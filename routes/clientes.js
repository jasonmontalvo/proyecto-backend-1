const {Router} = require ('express')
const{addcliente, updateCliente, deleteCliente, listcliente, listncbyid}=require('../controllers/clientes');


const router = Router();


router.get('/', listcliente);
router.get('/:id', listncbyid);
//router.post('/', signIn);
router.put('/', addcliente);
router.patch('/:id', updateCliente);
router.delete('/:id', deleteCliente);
module.exports =router;