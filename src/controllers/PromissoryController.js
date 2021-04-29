const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

const promissoryData = [];

module.exports = {
  promissoryData,
  create(req, res) {
    return res.render("promissory");
  },
  save(req, res) {
    const data = req.body;

    const id = promissoryData.length + 1;
    promissoryData.push({ id, ...data });

    return res.redirect("/");
  },
  show(req, res) {
    const promissoryId = req.params.id;
    console.log(promissoryId);

    const data = promissoryData.find(
      (promissory) => promissory.id == promissoryId
    );

    if (!data) {
      return res.send(404);
    }

    return res.render("print", { data });
  },
};

// {
//   promissoryNumber,
//   promissoryValue,
//   dueDate,
//   dueDateInFull,
//   takerName,
//   takerCpf,
//   promissoryValueInFull,
//   issuerName,
//   issuerCpf,
//   issuerName2,
//   issuerCpf2,
//   isseuDate,
//   address,
// }
