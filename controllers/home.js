const index = require('../views/partials/index.ejs')

module.exports = {
  getIndex: (req, res) => {
    res.render(index);
  },
};
