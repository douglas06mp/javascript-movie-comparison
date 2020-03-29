const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      s: searchTerm
    }
  });
  console.log(response);
};

const onInput = e => {
  fetchData(e.target.value);
};

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 800));
