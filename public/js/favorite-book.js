let favoriteBook = document.querySelector('#favorite-book');

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

favoriteBook.addEventListener('click', favBook);