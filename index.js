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
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.innerHTML = `
        <img src='${movie.Poster}' />
        <h1>${movie.Title}</h1>
      `;
    document.querySelector('.search-preview').append(div);
  });
};

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 800));
