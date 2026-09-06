const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.CAR_VERSION || 'v1';

app.use(express.static(path.join(__dirname, 'public')));

const cars = [
  { name: 'InnoCar Model 1', unique: 'Three rows of seating with all-terrain traction control', tagline: 'Room for the whole crew', image: '/1.jpeg' },
  { name: 'InnoCar Model 2', unique: '2-ton towing capacity with reinforced steel bed', tagline: 'Built for the job site', image: '/2.jpeg' },
  { name: 'InnoCar Model 3', unique: 'Retractable hardtop in under 12 seconds', tagline: 'Top down, every weekend', image: '/3.jpeg' },
];

app.get('/', (req, res) => {
  const cards = cars
    .map(
      (c) => `
      <div class="card">
        <div class="badge">InnoCar</div>
        ${c.image ? `<img src="${c.image}" alt="${c.name}" loading="lazy">` : ''}
        <h2>${c.name}</h2>
        <p class="tagline">${c.tagline}</p>
        <p class="unique">${c.unique}</p>
        <button>More Information</button>
      </div>`
    )
    .join('');

  res.send(`
    <html>
      <head>
        <title>InnoCar</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, Segoe UI, Roboto, sans-serif;
            background: #0a0a0b;
            color: #e8e8ea;
          }
          header {
            padding: 32px 24px 20px;
            text-align: center;
            border-bottom: 1px solid #2b2b2d;
          }
          header h1 {
            margin: 0;
            font-size: 2.4rem;
            letter-spacing: 1px;
          }
          header h1 span { color: #c7cad0; }
          header p {
            margin: 6px 0 0;
            color: #8a8d92;
            font-size: 0.85rem;
          }
          .grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            padding: 36px 24px;
            max-width: 1000px;
            margin: 0 auto;
          }
          .card {
            background: #17181a;
            border: 1px solid #2b2b2d;
            border-radius: 14px;
            padding: 22px;
            width: 260px;
            text-align: center;
            transition: transform 0.15s ease, border-color 0.15s ease;
          }
          .card:hover {
            transform: translateY(-4px);
            border-color: #c7cad0;
          }
          .card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 10px;
          }
          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #e2e4e8, #9a9ea5);
            color: #141516;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            padding: 3px 10px;
            border-radius: 999px;
            margin-bottom: 10px;
          }
          .card h2 {
            margin: 0 0 6px;
            font-size: 1.3rem;
          }
          .tagline {
            color: #8a8d92;
            font-size: 0.85rem;
            margin: 0 0 14px;
          }
          .unique {
            font-size: 0.9rem;
            color: #c7cad0;
            font-weight: 600;
            margin: 0 0 16px;
          }
          button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #d7d9dc, #8f9299);
            color: #141516;
            font-weight: 600;
            cursor: pointer;
          }
          button:hover { background: linear-gradient(135deg, #eceded, #a3a6ad); }
          footer {
            text-align: center;
            color: #55585c;
            font-size: 0.75rem;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Inno<span>Car</span></h1>
          <p>Build: ${VERSION}</p>
        </header>
        <div class="grid">${cards}</div>
        <footer>&copy; InnoCar Motors - demo build</footer>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', version: VERSION }));
app.get('/api/cars', (req, res) => res.json(cars));

if (require.main === module) {
  app.listen(PORT, () => console.log(`InnoCar running on port ${PORT}, version ${VERSION}`));
}

module.exports = app;
