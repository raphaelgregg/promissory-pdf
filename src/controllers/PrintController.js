const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

const promissory = [];
module.exports = {
  index(req, res) {
    return res.render("a");
  },
  async save(req, res) {
    const id = req.params.id;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `http://localhost:3000/promissory/${id}`;

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      printBackground: true,
      format: "letter",
      margin: {
        top: "5px",
        bottom: "5px",
        left: " 20px",
        right: " 20px",
      },
    });

    await browser.close();

    res.contentType("application/pdf");

    return res.send(pdf);
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
