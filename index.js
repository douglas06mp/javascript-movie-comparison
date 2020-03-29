const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      s: searchTerm
    }
  });
  console.log(response);
};

let timeoutId;
const onInput = e => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    fetchData(e.target.value);
  }, 1000);
};

const input = document.querySelector('input');
input.addEventListener('input', onInput);
