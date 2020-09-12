const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, 'config', '.env'),
});

const dbInit = require('./db/init');
const { server } = require('./config/server');
const io = require('./sockets/socket');


dbInit
    .then(() => server.listen(9999, () => {



      console.log('server has been' +
          ' started')
    }))
    .catch((err) => console.log('error'));
