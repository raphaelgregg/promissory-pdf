const { promissoryData } = require("./PromissoryController");

module.exports = {
  index(req, res) {
    return res.render("index", { bd: promissoryData });
  },
};
