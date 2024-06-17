const express=require("express");
const subjectController = require('../controllers/subjectController');
const verifyAdminToken=require('../middleware/verifyAdminToken');
const router=express.Router();
router.post('/add',subjectController.addSubject);
router.get('/',subjectController.getSubjects);
router.get('/:id',subjectController.getSubject);
router.delete('/:subjectId',subjectController.deleteSubject);
module.exports=router;
