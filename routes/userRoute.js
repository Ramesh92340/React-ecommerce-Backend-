


const express = require('express');
const router = express.Router();  
const userController = require('../controllers/userController.js');


router.post('/register',userController.registration);
router.post('/login',userController.logIn);
router.get('/profile', userController.profile);

router.get('/profile/:id',userController.selectproduct);
router.get('/product',userController.products);

router.post('/addfavourite',userController.addfavourite)
router.delete('/deletefav', userController.deletefav);
router.get('/getfavitems',userController.getfavitems);


router.post('/addtocart',userController.addtocart);
router.delete('/deletecart', userController.deletecart);
router.delete('/decreseitem', userController.decreseitem);
router.get('/getcartitems',userController.getcartitems);


module.exports = router;