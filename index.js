const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const chalk = require('chalk');
const Path = require('path');
const fs = require('fs');

axios.get("https://www.dmm.co.jp/mono/dvd/-/detail/=/cid=ssis071/", { headers: { "Cookie": "age_check_done=1"}}).then(async function (res) {
  //console.log(res);
  const dom = new JSDOM(res.data);

  // Css Selector by ID, then get attribute value by attribure name
  const linkPath = dom.window.document.querySelector("#performer > a").getAttribute('href');
  console.log(`Actress link: ${chalk.green(linkPath)}`);

  // Css Selector by Relative cssSelector
  const videoDuration = dom.window.document.querySelector("body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(5) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)").textContent;
  console.log(`Video duration: ${chalk.green(videoDuration)}`);

  // Css Selector get actress image small
  const actressImageSmallPath = dom.window.document.querySelector(".tdmm").getAttribute("src");
  console.log(`Actress image small: ${chalk.green(actressImageSmallPath)}`);

  // Css Selector select video plot
  const videoPlot = dom.window.document.querySelector("p[class='mg-b20']").textContent;
  console.log(`Video plot: ${chalk.green(videoPlot.trim())}`);

  // Css Selector select actress image large
  const actressImageLarge = dom.window.document.querySelector(".tx10.pd-3.lh4 > a").getAttribute("href");
  console.log(`Actress image large: ${chalk.green(actressImageLarge)}`);

  // Css Selector select video title
  const videoTitle = dom.window.document.querySelector(".item.fn").textContent;
  console.log(`Video title: ${chalk.green(videoTitle)}`);

  // Call function to download image with url
  downloadImage(actressImageLarge);

  // Base code
  //console.log(dom.window.document.querySelector("a[href='/mono/dvd/-/list/=/article=actress/id=1061509/']").textContent);
}).catch(function (err) {
  console.log(err);
});

//Download image function
async function downloadImage(url) {

  const imageFileNameWithExtension = Path.basename(url);
  console.log(imageFileNameWithExtension);
  const saveImageName = Path.resolve(__dirname, imageFileNameWithExtension);

  try {
    const response = await axios( {
      method: "GET",
      url: url,
      responseType: "stream"
    });

    response.data.pipe(fs.createWriteStream(saveImageName));

  // Error on axios
  } catch (error) {
    console.log(error);
  }
};