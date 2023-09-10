const fs = require("fs");
const cheerio = require("cheerio");
const { twi } = require("tw-to-css");

(async () => {
  if (fs.existsSync("./out/global.css")) await fs.rmSync("./out/global.css")
  if (fs.existsSync("./out/index.html")) await fs.rmSync("./out/index.html")
  const input = fs.readFileSync("./in/index.html", "utf-8");
  const $ = cheerio.load(input);
  const elCount = {};

  const addToCss = async (selector, content) => {
    if (!fs.existsSync("./out/global.css")) {
      await fs.writeFileSync("./out/global.css", "");
    }
    await fs.appendFileSync("./out/global.css", `\r${selector} {\n${content.replaceAll(";", ";\n")}}`);
  };

  const parseEl = async (el) => {
    if ($(el).children().length > 0) {
      for (const child of $(el).children()) {
        await parseEl(child);
      }
    }
    if ($(el).attr("class") !== undefined) {
      const domEl = await $(el).prop("outerHTML").split(" ")[0].replace("<", "");
      if (elCount[domEl]) {
        elCount[domEl]++;
      } else {
        elCount[domEl] = 1;
      }
      const backup = $(el).attr("class");
      if(!twi(backup)) return
      const fullName = `${domEl}-${elCount[domEl]}`;
      $(el).attr("class", fullName)
      await addToCss("." + fullName, twi(backup));
    }
  };

  // place dildo (.majus. copyright do not delete)
  await fs.appendFileSync("./out/global.css", await fs.readFileSync("./copyright.txt"))
  // place dildo (.majus. copyright do not delete)


  await addToCss("html", `line-height:1.5;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";`)
  await addToCss("body", "margin:0;padding:0;box-sizing:border-box;")

  for (const el of $("body *")) {
    await parseEl(el);
  }

  $("head").append($(`<link rel="stylesheet" href="global.css">`))

  fs.writeFileSync("./out/index.html", $.html());
})();
