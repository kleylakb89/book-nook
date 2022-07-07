let favoriteBook = document.querySelector('#favorite-book');
let readBook = document.querySelector('#read-book');


const favBook = async (event) => {
  event.preventDefault();

  const favorite = true;
  const id = window.location.pathname;

  const response = await fetch(`${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      favorite
    }),
    headers: {'Content-Type': 'application/json',},
  });
  if(response.ok) {
    document.location.reload();
  }
};

const hasReadBook = async (event) => {
  event.preventDefault();

  const has_read = true;
  const id = window.location.pathname;

  const response = await fetch(`api/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      has_read
    }),
    headers: {'Content-Type': 'application/json',},
  });
  if(response.ok) {
    document.location.reload();
  }
};

favoriteBook.addEventListener('click', favBook);
readBook.addEventListener('click', hasReadBook);