const userModel = require('../models/userModles');
const productModle = require('../models/productModles');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { get } = require('../routes/userRoute');
// const userModles = require('../models/userModles');
const SECRET_KEY = 'Your_SECRET_KEY';
// const SECRET_KEY_2 = 'Your_SECRET_KEY_2';


class UserController {
  async registration(req, res) {
    const user = req.body;
    try {
      const users = await userModel.registration(user);
      res.status(400).json({ users })
    }
    catch (error) {


      console.error('Error registering user:', error);
      res.status(500).json({ message: 'user alredy exists' });
    }
  }


  async logIn(req, res) {
    try {
      const { name, password } = req.body;

      // Validate request data
      if (!name || !password) {
        return res.status(400).json({ message: 'Invalid request. Username and password are required' });
      }

      // Find the user in the user model
      const foundUser = await userModel.logIn({ name, password });

      if (!foundUser) {
        return res.status(404).json({ status: 0, error: 'User not found' });
      }

      // Check if the provided password matches the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate a JWT token with the user's name as payload
      const tablename = 'products';
      const token = jwt.sign({ name: foundUser.name, tablename: tablename }, SECRET_KEY, { expiresIn: '24h' });


      // Return a success response with the JWT token
      res.status(200).json({ status: 1, message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }






  async profile(req, res) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {

      const decoded = jwt.verify(token, SECRET_KEY);

      const name = decoded.name;

      const user = await userModel.profile(name);
      // const item = await productModle.getAllProduct()


      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // const tablename = 'products';
      // const token_1 = jwt.sign({ table:tablename }, SECRET_KEY_2, { expiresIn: '24h' });
      res.status(200).json({ status: 1, message: " user detailes", user });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(401).json({ message: 'Invalid token' });
    }


  }



  async selectproduct(req, res) {

    const id = req.params.id;  // Corrected extracting id from req.params


    try {
      const products = await userModel.selectproduct(id);  // Passing the correct id
      res.status(200).json({ status: 1, message: 'Products for the specified id:', products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 0, message: 'Internal error' });
    }
  }



  async products(req, res) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {

      const decoded = jwt.verify(token, SECRET_KEY);



      const table = decoded.tablename;
      if (table == 'products') {



        const item = await userModel.products();
        res.status(200).json({ status: 1, message: 'getting All your products Suuucccessfully!!!!', item });
        // res.json(users);
      }

    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }



  async addfavourite(req, res) {
    const fav = req.body;
    // console.log(fav);return;

    try {
      const item = await userModel.getItem(fav);
      // console.log(item);return; 
      if (item) {
        await userModel.insertFav(item, fav);
        // console.log(favourites);return;
        res.status(400).json({ status: 1, message: 'favourites aadded sucefully..!' })
      }
      else {
        res.status(404).json({ status: 0, message: 'this item is not in the products list!' })
      }
    }
    catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ status: 0, message: 'this item is alredy added' });
    }
  }






  async deletefav(req, res) {
    const { id } = req.body;
    try {
      await userModel.delete(id);
      res.status(200).json({ status: 1, message: 'deleted product Suuucccessfully!!!!' });

    } catch (error) {
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }






  async getfavitems(req, res) {
    try {
      const item = await userModel.getfavitems();
      res.status(200).json({ status: 1, message: 'your favourite products list ', item });

    }
    catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }



  async addtocart(req, res) {
    const fav = req.body;
    // console.log(fav);return;

    try {
      const item = await userModel.getcart(fav);
      if (!item) {
        res.status(500).json({ status: 0, message: 'this item is not avalible at us' });
      }
      // console.log(item);return;
      const price = item.price;
      const delivery_charge = item.delivery_charge;
      // console.log(item.price);return; 
      if (item) {
        await userModel.insertcart(item, fav, price, delivery_charge);
        // console.log(favourites);return;
        res.status(400).json({ status: 1, message: '  aadded cart sucefully..!' })
      }
      else {
        res.status(404).json({ status: 0, message: 'this item is not in the products list!' })
      }
    }
    catch (error) {
      console.error('Error getting products:', error);
      // res.status(500).json({ status:0, message: 'this item is alredy added' });
    }
  }



  async deletecart(req, res) {
    const { id } = req.body;
    try {
      await userModel.deletecart(id);
      res.status(200).json({ status: 1, message: 'deleted product Suuucccessfully!!!!' });

    } catch (error) {
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }


  async decreseitem(req, res) {
    const { id } = req.body;
    try {
      await userModel.decreseitem(id);
      res.status(200).json({ status: 1, message: 'deleted product Suuucccessfully!!!!' });

    } catch (error) {
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }

  async getcartitems(req, res) {
    try {
      const item = await userModel.getcartitems();
      const price = await userModel.getcartprice();
      const total_price_of_products = price.sum;
      const delivery_charge = await userModel.getdeliveryCharge();
      const total_price_of_delivery_charges = delivery_charge.sum;
      const total_price_of_product = parseInt(total_price_of_products);
      const total_price_of_delivery_charge = parseInt(total_price_of_delivery_charges);
      const total_price = total_price_of_product + total_price_of_delivery_charge;


      res.status(200).json({ status: 1, message: 'your cart products list ', item, total_price_of_products, total_price_of_delivery_charges, total_price });

    }
    catch (error) {
      console.error('Error getting products:', error);

      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }

}
module.exports = new UserController();