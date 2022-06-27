const puppeteer = require("puppeteer");
const fs = require("fs");

export default function getImage() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://bio.site/guione");

    const imgList = await page.evaluate(() => {
      const nodeList: any = document.querySelectorAll("section a div img");
      const imgArray = [...nodeList];
      console.log("imgArray", imgArray);
      const list = imgArray.map(({ src }) => ({
        src,
      }));
      return list;
    });

    fs.writeFile(
      "unfold.json",
      JSON.stringify(imgList, null, 2),
      (err: any) => {
        if (err) throw new Error("Algo deu errado");

        console.log("Arquivo criado");
      }
    );
    await browser.close();
  })();
}
