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
  dropdown.classList.add('is-active');

  movies.forEach(movie => {
    const link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.innerHTML = `
        <img src='${movie.Poster}' />
        ${movie.Title}
      `;
    results.append(link);
  });
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
input.addEventListener('input', debounce(onInput, 800));
