const fetchData = async searchTerm => {
  const { data } = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      s: searchTerm
    }
  });

  if (data.Error) return [];
  return data.Search;
};

const onInput = async e => {
  const movies = await fetchData(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  results.innerHTML = '';
  dropdown.classList.add('is-active');

  movies.forEach(movie => {
    const link = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    link.classList.add('dropdown-item');
    link.innerHTML = `
      <img src='${imgSrc}' />
      ${movie.Title}
    `;
    link.addEventListener('click', e => {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    results.appendChild(link);
  });
};

const onMovieSelect = async movie => {
  const { data } = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      i: movie.imdbID
    }
  });
  document.querySelector('.summary').innerHTML = movieTemplate(data);
};

const movieTemplate = movieDetail => {
  console.log(movieDetail);
  return `
    <article class="media">
      <figure class=media-left">
        <p class="image">
        <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

const autocomplete = document.querySelector('.autocomplete');
autocomplete.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input" type="text" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;
const dropdown = document.querySelector('.dropdown');
const results = document.querySelector('.results');
const input = document.querySelector('.input');
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', e => {
  if (!autocomplete.contains(e.target)) dropdown.classList.remove('is-active');
});
