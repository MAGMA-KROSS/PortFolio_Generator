
import { Router } from 'express';
const router=Router();

router.post('/',(req,res)=>{
    res.json({message: " signup done successfully"})
})

export default router;