const mongoose = require('mongoose');

const Role = mongoose.Schema({
  fullName   : String,
  name       : String,
  isRecruiter: Boolean,
  company    : String,
  email      : String,
  offers     : [{
    offerType: String,
    salary   : String,
    isLead   : Boolean,
    role     : String,
    company  : String,
    start    : mongoose.Schema.Types.Mixed,
    duration : mongoose.Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('Role', Role);
