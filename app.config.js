const myValue = 'My App';

module.exports = () => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    return {
      /* your production config */
    };
  } else {
    return {
      /* your development config */
      extra: {
        api: {
          baseURL: 'http://localhost:8080/api/v1'
        }
      }
    };
  }
};