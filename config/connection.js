const { connect, connection } = require('mongoose');

connect('mongodb://localhost/slernbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
