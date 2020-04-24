const { db } = require('../db');

module.exports = createAuthorizeFunc = (token) => {
    return () => {
      if (!token || token !== 'token') {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
      }
  
      return db.get('user').value();
    };
  };
