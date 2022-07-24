const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');
// const express = require('express');
// const route = express.Router()

// middlewares
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');


function initRoutes(app) {
    app.get('/', homeController().index);

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

      // PAGE ROUTES
      app.get('/contact',(req,res)=>{
        res.render('contact')
      })
        app.get('/restaurant',(req,res)=>{
        res.render('restaurant');
      })  
      app.get('/',(req,res)=>{
        res.render('home');
      })
      app.get('/menu',(req,res)=>{
        res.render('menu');
      })
    

    // customer routes
    app.post('/orders', auth, orderController().store);
    app.get('/customers/orders', auth, orderController().index);
    app.get('/customers/orders/:id', auth, orderController().show);

    // admin routes
    app.get('/admin/orders', admin, adminOrderController().index);
    app.post('/admin/order/status', admin, statusController().update);

  
}



module.exports = initRoutes;