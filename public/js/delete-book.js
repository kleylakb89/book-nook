let deletedBook = document.querySelector('#delete-book');

// function for deleting a book
const deleteBook = async (event) => {
  event.preventDefault();
  const id = window.location.pathname;
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',},
  });
  document.location.replace('/books');

};

deletedBook.addEventListener('click', deleteBook);