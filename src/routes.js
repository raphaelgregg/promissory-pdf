const express = require("express");
const routes = express.Router();

const puppeteer = require("puppeteer");
const path = require("path");
const ejs = require("ejs");

const DashboardController = require("./controllers/DashboardController");
const PromissoryController = require("./controllers/PromissoryController");
const PrintController = require("./controllers/PrintController");

routes.get("/", DashboardController.index);

routes.get("/promissory", PromissoryController.create);
routes.post("/promissory", PromissoryController.save);
routes.get("/promissory/:id", PromissoryController.show);

// routes.get("/print", PrintController.create);
routes.get("/promissory/:id/pdf", PrintController.save);

const data = { promissoryNumber: "142" };
routes.get("/print", (req, res) => {
  const filePath = path.join(__dirname, "print.html");

  ejs.renderFile(filePath, { data }, async (err, html) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    } else {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto("http://localhost:3000/print", {
        waitUntil: "networkidle0",
      });

      const pdf = await page.pdf({
        printBackground: true,
        format: "letter",
        margin: {
          top: "20px",
          bottom: "40px",
          left: " 20px",
          right: " 20px",
        },
      });

      await browser.close();

      res.contentType("application/pdf");

      return res.send(pdf);
    }
  });
});

// routes.get("/pdf", async (request, response) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto("http://localhost:3000/", {
//     waitUntil: "networkidle0",
//   });

//   const pdf = await page.pdf({
//     printBackground: true,
//     format: "letter",
//     margin: {
//       top: "20px",
//       bottom: "40px",
//       left: " 20px",
//       right: " 20px",
//     },
//   });

//   await browser.close();

//   response.contentType("application/pdf");

//   return response.send(pdf);
// });

module.exports = routes;
