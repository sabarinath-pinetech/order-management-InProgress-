const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Customer = new Schema({
   name: {
      type: String
   }
}, {
   collection: 'customers'
})

module.exports = mongoose.model('Customer', Customer)
