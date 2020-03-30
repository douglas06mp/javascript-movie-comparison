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

createAutoComplete({
  root: autocomplete,
  renderLink(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src='${imgSrc}' />
      ${movie.Title} (${movie.Year})
    `;
  },
  selectLink(movie) {
    onMovieSelect(movie);
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
});
