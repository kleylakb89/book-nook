let deletedBook = document.querySelector('#delete-book');


const deleteBook = async (event) => {
  event.preventDefault();
  const id = window.location.pathname;
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',},
  });
  if(response.ok) {
    document.location.replace('/books');
  }
};

deletedBook.addEventListener('click', deleteBook);