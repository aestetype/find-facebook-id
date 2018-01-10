const findFacebookId = require('./index.js');

test('should resolve facebook user', () =>
  findFacebookId('zuck').then((id) => {
    expect(id).toBe('4');
  }));

test('should resolve facebook page', () =>
  findFacebookId('laurentgarnierofficial').then((id) => {
    expect(id).toBe('273706360456');
  }));

test('should resolve facebook group', () =>
  findFacebookId('theopenuniversity').then((id) => {
    expect(id).toBe('7084005675');
  }));

test('should pass error', () =>
  findFacebookId('404notexistonfacebook')
    .then(() => {
      throw new Error();
    })
    .catch((err) => {
      expect(err.message).toBe('id not found for 404notexistonfacebook (code 404)');
      expect(err.statusCode).toBe(404);
    }));
