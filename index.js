'use strict';

const app = require('./app');
const mongoose = require('mongoose');
const { PORT, DATABASE_MONGO_URL } = require('./configurations/env.config');
console.log(DATABASE_MONGO_URL)

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(DATABASE_MONGO_URL, (err) => {
   if (err) {
      console.log('It has happened a error.')
      console.log(err)
      return;
   } else {
      try {
         app.listen(PORT, () => {
            console.log('Server is running in port: ' + PORT);
         });
      } catch (error) {
         console.log('*****' + error.message + '*****')
      }
   }
});