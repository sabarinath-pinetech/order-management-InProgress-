const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
   id_user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
   },
   id_product: {
    type: mongoose.Schema.Types.ObjectId, ref: 'products'
   },
   quantity: {
    type: Number
   },
   total: {
      type: Number
   },
   discounted_total: {
    type: Number
   },
   date_add: {
      type: Date,
      default: Date.now()
   }
}, {
   collection: 'orders'
})

module.exports = mongoose.model('Order', Order)
