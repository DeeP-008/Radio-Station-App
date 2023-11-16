const mongoose = require('mongoose');



const searchHistory = new mongoose.Schema({
  input: {type:String, iundex: true},
  timestamp: {type:Date, default:Date.now}
}, {collection: 'searchHistory'})


const recentHistory = mongoose.model('searchHistory', searchHistory);

module.exports = recentHistory;