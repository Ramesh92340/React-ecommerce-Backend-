const express = require('express');
const router = express.Router();  
const ProductController = require('../controllers/ProductController.js');


router.post('/addOn',ProductController.addOn);
router.get('/getProducts', ProductController.getAllProduct);
router.put('/update/:id',ProductController.update);

router.put('/modelupdate/:id',ProductController.modelupdate);
router.put('/priceupdate/:id',ProductController.priceupdate);
router.put('/discripationupdate/:id',ProductController.discripationupdate);
router.put('/brandupdate/:id',ProductController.brandupdate );
router.put('/ratingupdate/:id',ProductController.ratingupdate);

router.delete('/delete/:id', ProductController.delete);





router.get('/brandname/:brand',ProductController.brandname);
router.get('/rating/:rating',ProductController.rating);
router.get('/product/:id',ProductController.product);








module.exports = router;