const express=require("express");
const authorController = require('../controllers/AuthorController');
const verifyAdminToken=require('../middleware/verifyAdminToken');
const router=express.Router();
router.post('/add-author',verifyAdminToken,authorController.addAuthor);
router.get('/authors',authorController.getAuthors);
router.get('/:id',verifyAdminToken,authorController.getAuthor);
module.exports=router;
