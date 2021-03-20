const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
   id_customer: {
      type: String
   },
   id_product: {
      type: String
   },
   quantity: {
    type: String
   },
   total: {
      type: String
   },
   date_add: {
      type: Date,
      default: Date.now()
   }
}, {
   collection: 'orders'
})

module.exports = mongoose.model('Order', Order)
