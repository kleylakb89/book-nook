let readBook = document.querySelector('#read-book');

// function for updating if a book has been read
const hasReadBook = async (event) => {
  event.preventDefault();

  const has_read = true;
  const id = window.location.pathname;

  const response = await fetch(`/api/${id}`, {
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

readBook.addEventListener('click', hasReadBook);