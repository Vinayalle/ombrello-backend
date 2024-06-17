const express=require("express");
const classController = require('../controllers/classController');
const verifyAdminToken=require('../middleware/verifyAdminToken');
const router=express.Router();
router.post('/add',classController.addClass);
router.get('/',classController.getClasses);
router.get('/:id',classController.getClass);
router.delete('/:classId',classController.deleteClass);
module.exports=router;
