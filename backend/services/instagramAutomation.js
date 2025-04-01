const puppeteer = require('puppeteer');
const db = require('../database/db');
const hashtagsList = require('../utils/hashtagsList');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const executar = async (linkPostagem, categoria, client_id) => {
  const INTERACTION_DELAY = parseInt(process.env.INTERACTION_DELAY) || 2000;
  const HEADLESS = process.env.HEADLESS === 'true';
  const hashtags = hashtagsList[categoria] || [];

  if (hashtags.length === 0) {
    throw new Error(`Nenhuma hashtag encontrada para a categoria: ${categoria}`);
  }

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  try {
    console.log('🔐 Aguardando login manual no Instagram...');
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

    await delay(30000); // tempo para login manual

    for (const hashtag of hashtags) {
      const url = `https://www.instagram.com/explore/tags/${hashtag.replace('#', '')}/`;

      console.log(`🔍 Buscando por hashtag: ${hashtag}`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      await delay(3000);

      const profileLinks = await page.$$eval('article a', anchors =>
        anchors.map(a => a.href).filter(h => h.includes('/p/')).slice(0, 3)
      );

      for (const postLink of profileLinks) {
        await page.goto(postLink, { waitUntil: 'networkidle2' });
        await delay(2000);

        const profileUrl = await page.$eval('header a', el => el.href);
        await page.goto(profileUrl, { waitUntil: 'networkidle2' });
        await delay(2000);

        const nome = await page.$eval('header section h2, header section h1', el => el.textContent).catch(() => 'sem nome');
        const instagram = profileUrl;
        const data = new Date().toLocaleString();

        await page.click('article section span svg[aria-label="Curtir"]').catch(() => {});
        await delay(INTERACTION_DELAY);

        // REGISTRA COM client_id
        db.run(
          `INSERT INTO leads (nome, instagram, categoria, hashtag_usada, link_postagem, data, client_id)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [nome, instagram, categoria, hashtag, linkPostagem, data, client_id]
        );

        console.log(`✅ Interagido com ${nome} (${instagram})`);
        await delay(1000);
      }

      await delay(2000);
    }

    console.log('🏁 Automação finalizada.');
  } catch (error) {
    console.error('❌ Erro durante a automação:', error.message);
  }
};

module.exports = { executar };
