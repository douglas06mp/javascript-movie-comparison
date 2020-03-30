const createAutoComplete = ({
  root,
  renderLink,
  selectLink,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" type="text" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('.input');
  const dropdown = root.querySelector('.dropdown');
  const results = root.querySelector('.results');

  const onInput = async e => {
    const items = await fetchData(e.target.value);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    results.innerHTML = '';
    dropdown.classList.add('is-active');

    items.forEach(item => {
      const link = document.createElement('a');

      link.classList.add('dropdown-item');
      link.innerHTML = renderLink(item);
      link.addEventListener('click', e => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        selectLink(item);
      });

      results.appendChild(link);
    });
  };

  input.addEventListener('input', debounce(onInput, 500));
  document.addEventListener('click', e => {
    if (!autocomplete.contains(e.target))
      dropdown.classList.remove('is-active');
  });
};
