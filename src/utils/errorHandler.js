
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    if (err.message) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  