let selectedBook = document.querySelector('.view-book');

const viewBook = async (event) => {
  event.preventDefault();
  const id = window.location.pathname;
  const response = await fetch(`${id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',},
  });
  console.log(response);
};

selectedBook.addEventListener('click', viewBook);
