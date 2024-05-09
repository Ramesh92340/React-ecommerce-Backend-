const pool = require('../config/userConfig.js');
const valid = require('../middleWare/userValidation.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const FAVOURITES_FILE_PATH = path.join(__dirname, 'favourites.json');



class userModel {
    async registration(user) {
        const { name, mobile, gender, mail, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const ismail = valid.validateEmail(mail);
        const ispassword = valid.validatePassword(hashedPassword);
        const ismobile = valid.validatePhoneNumber(mobile);
        const isname = valid.validatename(name);
        const isgender = valid.validateGender(gender);




        if (name) {
            if (mobile) {
                if (gender) {
                    if (mail) {
                        if (password) {
                            if (isname) {
                                if (ismail) {
                                    if (ispassword) {
                                        if (ismobile) {
                                            if (isgender) {

                                                const query = 'INSERT INTO ecomerce   ( name, mobile, gender, mail, password) VALUES ($1,$2,$3,$4,$5) RETURNING *';
                                                const values = [name, mobile, gender, mail, hashedPassword];
                                                const { rows } = await pool.query(query, values);
                                                return rows[0];

                                            } else {
                                                return { error: "invalid gender" };
                                            }
                                        }
                                        else {
                                            return { error: "invalid mobile number" };
                                        }
                                    }
                                    else {
                                        return { error: "invalid password" };
                                    }
                                }
                                else {
                                    return { error: "invalid email" };
                                }
                            } else {
                                return { error: "invalid name" };
                            }
                        } else {
                            return { error: "required password" };
                        }
                    } else {
                        return { error: "required mail" };
                    }
                } else {
                    return { error: "required gender" };
                }
            } else {
                return { error: "required mobile" };
            }
        } else {
            return { error: "required name" };
        }
    }


    async logIn(user) {

        const { name, password } = user;

        if (password) {
            const query = 'SELECT * FROM ecomerce where name=$1';
            const values = [name];
            const { rows } = await pool.query(query, values);
            return rows[0];

        } else {
            return { error: "invalid password" };
        }


    }


    async profile(name) {
        const names = name;
        try {
            const query = 'SELECT * FROM ecomerce WHERE name = $1';
            const values = [names];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }



    async selectproduct(id) {  // Corrected parameter
        try {
            const query = 'SELECT * FROM products WHERE id = $1';
            const values = [id];
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving products for the specified id');
        }
    }



    async products(table) {
        const query = 'SELECT * FROM products';
        const { rows } = await pool.query(query);
        return rows;
    }


    async getItem(fav) {
        const { id } = fav;
        // console.log();
        const query = 'SELECT * FROM products where id=$1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async insertFav(item, fav) {
        const { id } = fav;
        const query = 'insert into favourite  (itemid, items ) VALUES ($1,$2)';
        const values = [id, item];
        const result = await pool.query(query, values);
        return result.rows;
    }





    async delete(id) {
        const query = 'DELETE FROM favourite WHERE itemid = $1';
        await pool.query(query, [id]);

    }





    async getfavitems() {
        const query = 'SELECT * FROM favourite';
        const { rows } = await pool.query(query);
        return rows;
    }




    async getcart(fav) {
        const { id } = fav;
        // console.log();
        const query = 'SELECT * FROM products where id=$1';
        const { rows } = await pool.query(query, [id]);
        if (rows) {
            return rows[0];
        }
        else {
            return null;
        }
    }

    async insertcart(item, fav, price, delivery_charge) {
        const { id } = fav;
        const query = 'insert into addtocart  (itemid, items, price, delivery_charge ) VALUES ($1,$2,$3,$4)';
        const values = [id, item, price, delivery_charge];
        const result = await pool.query(query, values);
        return result.rows;
    }


    async deletecart(id) {
        const query = 'DELETE FROM addtocart WHERE itemid = $1';
        await pool.query(query, [id]);

    }


    async decreseitem(id) {
        const query = 'DELETE FROM addtocart WHERE cartid = $1';
        await pool.query(query, [id]);

    }

    async getcartitems() {
        const query = 'SELECT * FROM addtocart';

        const { rows } = await pool.query(query);
        return rows;
    }
    async getcartprice() {
        const query = 'SELECT sum(price) FROM addtocart';
        const { rows } = await pool.query(query);
        return rows[0];
    }
    async getdeliveryCharge() {
        const query = 'SELECT sum(delivery_charge) FROM addtocart';
        const { rows } = await pool.query(query);
        return rows[0];
    }
}

module.exports = new userModel();
