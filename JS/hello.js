

const apiKey = '4d72860f5da04576b1d5c5d2539d919b';
const newsContainer = document.getElementById('newsContainer');

async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// ... (previous code)

function createNewsCard(news) {
  const card = document.createElement('div');
  card.classList.add('news-card');

  const image = document.createElement('img');
  image.src = news.urlToImage;
  image.alt = news.title;
  card.appendChild(image);

  const heading = document.createElement('h2');
  heading.textContent = news.title;
  card.appendChild(heading);

  const subheading = document.createElement('h3');
  subheading.textContent = news.description;
  card.appendChild(subheading);

  const content = document.createElement('p');
  content.textContent = news.content || news.description;
  card.appendChild(content);

  const link = document.createElement('a');
  link.href = news.url; // Link to the full news article
  link.textContent = 'Read more';
  card.appendChild(link);

  const source = document.createElement('p');
  source.textContent = `Source: ${news.source.name}`;
  card.appendChild(source);

  const date = document.createElement('p');
  date.textContent = new Date(news.publishedAt).toDateString();
  card.appendChild(date);

  return card;
}

// ... (rest of the code)


async function renderNews() {
  const newsList = await fetchNews();

  newsList.forEach(news => {
    const card = createNewsCard(news);
    newsContainer.appendChild(card);
  });
}

renderNews();
