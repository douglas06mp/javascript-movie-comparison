let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const { data } = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      i: movie.imdbID
    }
  });
  summaryElement.innerHTML = movieTemplate(data);

  if (side === 'left') {
    leftMovie = data;
  } else {
    rightMovie = data;
  }

  if (leftMovie && rightMovie) runComparison();
};

const movieTemplate = movieDetail => {
  const awards = movieDetail.Awards.split(' ').reduce((acc, next) => {
    const value = parseInt(next);
    return isNaN(value) ? acc : acc + value;
  }, 0);
  const boxOffice = +movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
  const metascore = +movieDetail.Metascore;
  const imdbRating = +movieDetail.imdbRating;
  const imdbVotes = +movieDetail.imdbVotes.replace(/,/g, '');

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
    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${boxOffice} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

const runComparison = () => {
  console.log(leftMovie, rightMovie);
};

const autoCompleteConfig = {
  renderLink(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src='${imgSrc}' />
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const { data } = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '46fcbba6',
        s: searchTerm
      }
    });
    if (data.Error) return [];
    return data.Search;
  }
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  selectLink(movie) {
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    document.querySelector('.tutorial').classList.add('is-hidden');
  }
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  selectLink(movie) {
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    document.querySelector('.tutorial').classList.add('is-hidden');
  }
});
