const userController=require('../controllers/userController');
const express=require('express');

const router=express.Router();
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/:id/verify/:token',userController.emailSend);
router.post('/forgot-password',userController.forgotPass);
router.post('/reset-password/:id/:token',userController.resetPass);

module.exports=router;