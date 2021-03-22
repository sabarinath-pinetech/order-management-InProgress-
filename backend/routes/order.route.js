const express = require('express');
const app = express();
const orderRoute = express.Router();

// Order model
let Order = require('../models/Order');

// Add Order
orderRoute.route('/order/').post
((req, res, next) => {

  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});

// Get All Orders
orderRoute.route('/order/').get((req, res) => {
  Order
  .aggregate([
  {
      $lookup: {
          from: "users",
          localField: "id_user",
          foreignField: "_id",
          as: "user"
      },
  },
  {
      $unwind: "$user",
  },
  {
      $lookup: {
          from: 'products',
          localField: "id_product",
          foreignField: "_id",
          as: "product"
      },
  },
  {
      $unwind: "$product",
  },
])
.then(data => {
  // data.price = data.product.unit_price;
  // data.total_price = data.product.unit_price * data.quantity;
  // data.createdAt = data.date_add;
  const orderDetails = data.map((order) => ({
    ...order,
    createdAt: order.date_add,
    price: order.product.unit_price || order.product.price,
    total_price: order.quantity >= 3 
      ? ((order.product.unit_price || order.product.price) * order.quantity) * 0.8
      : (order.product.unit_price || order.product.price) * order.quantity
  }))
  res.send(orderDetails);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Orders."
  });
});
});

// Get single order
orderRoute.route('/order/:id').get((req, res) => {
   Order.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});

// Update order
orderRoute.route('/order/:id').put((req, res, next) => {
  Order.findByIdAndUpdate(req.params.id, {
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

// Delete order
orderRoute.route('/order/:id').delete((req, res, next) => {
  Order.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = orderRoute;
