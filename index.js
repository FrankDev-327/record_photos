'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.CONN, (err, res) => {
   if (err) {
      console.log('Ocurrió un error: -> ' + err)
      return;
   } else {
      try {
         app.listen(process.env.PORT, () => {
            console.log('Conectao al puerto: ' + process.env.PORT);
         });
      } catch (error) {
         console.log('*****' + error.message + '*****')
      }
   }
});