const getTableData = (data) => {
  const url = `https://jsonplaceholder.typicode.com/photos?_limit=100`;
  return fetch(url)
    .then((response) => response.json())
};

export { getTableData }
