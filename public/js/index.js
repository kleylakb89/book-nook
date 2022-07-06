const search = document.querySelector('#search');

const libraryGet = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/books/search', {
    method: 'GET',
    headers: {'Content-Type': 'application/json',},
  });
  console.log(response);
};

search.addEventListener('click', libraryGet);