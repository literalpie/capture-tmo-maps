const puppeteer = require('puppeteer');
const cwebp = require('cwebp').CWebp;

(async () => {
    const today = new Date()
    const fileNameBase = `TMO-Screen${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        width: 3360,
        height: 1974,
    })
    await page.goto( 'https://maps.t-mobile.com/pcc.html?map=mvno-roamd-34l', { waitUntil : 'networkidle0' } );
    await page.waitForSelector('#pccFaqSection');
    // click .pccCloseIconSprite .pccPointer
    await page.click('.pccCloseIconSprite')
    await page.screenshot({path: `${fileNameBase}.jpg`, clip: {x: 330, y: 230, width: 2700, height: 1500}, quality: 90, type: 'jpeg'});
    await page.screenshot({path: `${fileNameBase}-low-res.jpg`, clip: {x: 330, y: 230, width: 2700, height: 1500}, quality: 30, type: 'jpeg'});
    await browser.close();

    var encoder = cwebp(`${fileNameBase}.jpg`);
    await encoder.write(`${fileNameBase}.webp`, (err)=>{
        console.log(err || 'image converted to webp')
    });

    await encoder.quality(30)
    await encoder.write(`${fileNameBase}-low-res.webp`, (err)=>{
        console.log(err || 'image converted to lowq webp')
    });
})();