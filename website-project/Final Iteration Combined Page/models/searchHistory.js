const mongoose = require('mongoose');



const searchHistory = new mongoose.Schema({
  input: {type:String, index: true},
  timestamp: {type:Date, default:Date.now}
}, {collection: 'search-history'})


const recentHistory = mongoose.model('search-history', searchHistory);

module.exports = recentHistory;