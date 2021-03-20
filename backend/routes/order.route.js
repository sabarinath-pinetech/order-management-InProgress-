const express = require('express');
const app = express();
const orderRoute = express.Router();

// Order model
let Order = require('../models/Order');

app.post('/order/create', async (req, res) => {
  const order = await Order.findOne({_id: eq.body.id_product});
  if(!order) {
    res.status(400).json({
      msg: 'invalid product'
    });
  }

  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Add Order
// orderRoute.route('/order/create').post
// ((req, res, next) => {
//   Order.findById(req.body.id_product, (error, data) => {
//     if (error) {
//       return next(error)
//     }
//     if(!data) {
//       res.status(400).json({
//         msg: 'invalid product'
//       });
//     }
//     Order.create(req.body, (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         res.json(data)
//       }
//     });
//   });
// });

// Get All Orders
orderRoute.route('/order/').get((req, res) => {
  Order.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});

// Get single order
orderRoute.route('/order/read/:id').get((req, res) => {
  Order.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});


// Update order
orderRoute.route('/order/update/:id').put((req, res, next) => {
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
orderRoute.route('/order/delete/:id').delete((req, res, next) => {
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
