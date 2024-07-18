import cors from "cors";
import express from "express";
import RSSParser from "rss-parser";
import axios from 'axios';
import cheerio, { text } from 'cheerio';
import { JSDOM } from 'jsdom';


const feedURLs = [
  "https://tuoitre.vn/rss/tin-moi-nhat.rss",
  "https://tuoitre.vn/rss/the-gioi.rss",
  "https://tuoitre.vn/rss/kinh-doanh.rss",
  "https://tuoitre.vn/rss/xe.rss",
  "https://tuoitre.vn/rss/van-hoa.rss",
  "https://tuoitre.vn/rss/the-thao.rss",
  "https://tuoitre.vn/rss/khoa-hoc.rss",
  "https://tuoitre.vn/rss/gia-that.rss",
  "https://tuoitre.vn/rss/ban-doc-lam-bao.rss",
  "https://tuoitre.vn/rss/phap-luat.rss",
  "https://tuoitre.vn/rss/cong-nghe.rss",
  "https://tuoitre.vn/rss/nhip-song-tre.rss",
  "https://tuoitre.vn/rss/giai-tri.rss",
  "https://tuoitre.vn/rss/giao-duc.rss",
  "https://tuoitre.vn/rss/suc-khoe.rss",
  "https://tuoitre.vn/rss/thu-gian.rss",
  "https://tuoitre.vn/rss/du-lich.rss",
];
const parser = new RSSParser();
let articles = [];

const parse = async url => {
  const feed = await parser.parseURL(url);
  feed.items.forEach(item => {
    articles.push({ ...item, category: url });
  });
};

const parseAllFeeds = async () => {
  for (const url of feedURLs) {
    await parse(url);
  }
}
parseAllFeeds();

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
};


let app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send(articles);
});

app.get('/api/article', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(decodeURIComponent(url));
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // const title = document.querySelector('h1')?.textContent || '';
    const body = document.body.innerHTML;
    const content = document.querySelector('.detail__cmain').innerHTML;

    // Lấy origin từ URL gốc trong RSS
    const parsedUrl = new URL(decodeURIComponent(url));
    const origin = `${parsedUrl.protocol}//${parsedUrl.host}`;

    res.json({ body, origin, content });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(error.response?.status || 500).send('Error fetching article');
  }
});

app.get('/api/search', (req, res) => {
  const { keyword } = req.query;
  const lowerKeyword = removeAccents(keyword.toLowerCase()).replace(/\s+/g, '');
  const filteredArticles = articles.filter(article =>
    removeAccents(article.title.toLowerCase().replace(/\s+/g, '')).includes(lowerKeyword)
  );

  res.json(filteredArticles);
});

const port = 4000;
const server = app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

