const productModel = require('../models/productModles');
// const jwt = require ('jsonwebtoken');
// const SECRET_KEY = 'Your_SECRET_KEY'

class productController {
  async addOn(req, res) {
    const item = req.body;
    try {
      const result = await productModel.addOn(item);
      res.status(400).json({ result })
    }
    catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'this product already exists' });
    }
  }

  async getAllProduct(req, res) {
    try {
      const item = await productModel.getAllProduct();
      res.status(200).json({ status: 1, message: 'getting All Created products Suuucccessfully!!!!', item });
      // res.json(users);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const update = await productModel.update(id, item);
      if (!update) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: 'Updated products Suuucccessfully!!!!', update });
    } catch (error) {
      console.error('Error updating products:', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }


  async modelupdate(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const modelupdate = await productModel.modelupdate(id, item);
      if (!modelupdate) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: ' name Updated   Suuucccessfully!!!!', modelupdate });
    } catch (error) {
      console.error('Error name updating :', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }


  async priceupdate(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const priceupdate = await productModel.priceupdate(id, item);
      if (!priceupdate) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: ' price Updated  Suuucccessfully!!!!', priceupdate });
    } catch (error) {
      console.error('Error price updating :', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }


  async discripationupdate(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const discripationupdate = await productModel.discripationupdate(id, item);
      if (!discripationupdate) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: 'discripation updated products Suuucccessfully!!!!', discripationupdate });
    } catch (error) {
      console.error('Error discripation updateing :', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }



  async brandupdate(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const brandupdate = await productModel.brandupdate(id, item);
      if (!brandupdate) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: ' brand updated products Suuucccessfully!!!!', brandupdate });
    } catch (error) {
      console.error('Error brand  updating  :', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }



  async ratingupdate(req, res) {
    const { id } = req.params;
    const item = req.body;
    try {
      const ratingupdate = await productModel.ratingupdate(id, item);
      if (!ratingupdate) {
        return res.status(404).json({ error: 'product not found' });
      }
      res.status(200).json({ status: 1, message: 'rating Updated  Suuucccessfully!!!!', ratingupdate });
    } catch (error) {
      console.error('Error rating updating  :', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }



  async delete(req, res) {
    const { id } = req.params;
    try {
      await productModel.delete(id);
      res.status(200).json({ status: 1, message: 'deleted product Suuucccessfully!!!!' });

    } catch (error) {
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }






  async brandname(req, res) {
    const brands = req.params;
    // console.log(brands);return;
    try {
      const models = await productModel.brandname(brands);
      res.status(200).json({ status: 1, message: 'names are showing below on your brands.....!!', models });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }




  async rating(req, res) {
    const rating = req.params.rating;
    // console.log(rating);return ;
    try {
      const name = await productModel.rating(rating);
      res.status(200).json({ status: 1, message: 'names are showing below on your rating.....!!', name });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  async product(req, res) {
    const id = req.params.id;
    try {
      const table = await productModel.product(id);
      res.status(200).json({ status: 1, message: 'the detailes you are searching is below.....!!', table });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }












}

module.exports = new productController();