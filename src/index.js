const request = require('request');

module.exports = function findFacebookId(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error('Invalid url'));
      return;
    }
    const url = `https://www.facebook.com/${name}`;
    request({
      method: 'GET',
      uri: url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode === 200) {
        const arrMatches = body.match(/entity_id":"\d*/i);
        if (arrMatches && arrMatches.length > 0) {
          const id = arrMatches[0].split('"').pop();
          resolve(id);
          return;
        }
        reject(new Error(`id not found for ${name}`));
      } else {
        const error = new Error(`id not found for ${name} (code ${res.statusCode})`);
        error.statusCode = res.statusCode;
        error.body = body;
        reject(error);
      }
    });
  });
};
