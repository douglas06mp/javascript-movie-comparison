const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '46fcbba6',
      i: 'tt0848228'
    }
  });
  console.log(response);
};

fetchData();
