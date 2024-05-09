const pool = require('../config/userConfig.js');
const valid = require('../middleWare/userValidation.js');
const bcrypt = require('bcryptjs');
class productModel {

    async addOn(item) {
        const { brand, model, discripation, rating, price, delivery_charge } = item;

        const query = 'INSERT INTO products  ( brand, model,discripation,rating,price,delivery_charge) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [brand, model, discripation, rating, price, delivery_charge];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }



    async getAllProduct() {
        const query = 'SELECT * FROM products';
        const { rows } = await pool.query(query);
        return rows;
    }






    async update(id, item) {
        const { brand, model, discripation, rating, price, delivery_charge } = item;
        const query = 'UPDATE products SET  brand = $1, model  = $2,discripation = $3, rating =$4, price = $5,delivery_charge= $6 WHERE id = $7 RETURNING *';
        const values = [brand, model, discripation, rating, price, delivery_charge, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }




    async modelupdate(id, item) {
        const { model } = item;
        const query = 'UPDATE products SET  model = $1  WHERE id = $2 RETURNING *';
        const values = [model, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }


    async priceupdate(id, item) {
        const { price } = item;
        const query = 'UPDATE products SET  price = $1  WHERE id = $2 RETURNING *';
        const values = [price, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }


    async discripationupdate(id, item) {
        const { discripation } = item;
        const query = 'UPDATE products SET  discripation = $1  WHERE id = $2 RETURNING *';
        const values = [discripation, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }


    async brandupdate(id, item) {
        const { brand } = item;
        const query = 'UPDATE products SET  brand = $1  WHERE id = $2 RETURNING *';
        const values = [brand, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }


    async ratingupdate(id, item) {
        const { rating } = item;
        const query = 'UPDATE products SET  rating = $1  WHERE id = $2 RETURNING *';
        const values = [rating, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }




    async delete(id) {
        const query = 'DELETE FROM products WHERE id = $1';
        await pool.query(query, [id]);
    }






    async brandname(brands) {
        try {
            const { brand } = brands;
            const query = 'SELECT model FROM products WHERE brand = $1';
            const result = await pool.query(query, [brand]);
            // console.log(rows);return;
            return result.rows.length > 0 ? result.rows : 'the product you have entred with the brand name is not availible in the website';
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving brand names');
        }
    }




    async rating(rating) {



        const query = 'SELECT model from products where rating = $1';

        try {
            const { rows } = await pool.query(query, [rating]);

            return rows.length > 0 ? rows : 'there is no product with the rating you have entered';

        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }



    async product(id) {



        const query = 'SELECT * from products where id = $1';

        try {
            const { rows } = await pool.query(query, [id]);

            return rows.length > 0 ? rows[0] : 'the id you entred is not availible in the database';


        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }





}






module.exports = new productModel();
