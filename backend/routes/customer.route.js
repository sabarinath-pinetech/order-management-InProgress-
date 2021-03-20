const express = require('express');
const app = express();
const customerRoute = express.Router();

// Customer model
let Customer = require('../models/Customer');

// Add Customer
customerRoute.route('/customers/create').post((req, res, next) => {
  Customer.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Customers
customerRoute.route('/customers/').get((req, res) => {
  Customer.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single customer
customerRoute.route('/customers/read/:id').get((req, res) => {
  Customer.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update customer
customerRoute.route('/customers/update/:id').put((req, res, next) => {
  Customer.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete customer
customerRoute.route('/customers/delete/:id').delete((req, res, next) => {
  Customer.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = customerRoute;
