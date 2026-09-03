const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  console.log('Navigating to http://localhost:5173/login');
  await page.goto('http://localhost:5173/login');
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
