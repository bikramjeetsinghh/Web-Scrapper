const mongoose = require('mongoose');
module.exports = function db() {
  const uri =
    'mongodb://localhost:27017/stickyNotes?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    mongoose.connection.on('connected', () => {
      console.log('connected to mongo database');
    });
    mongoose.connection.on('error', (err) => {
      console.log('Error at mongoDB: ' + err);
    });
  } catch (e) {
    console.error(e);
  }
};
