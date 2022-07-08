let selectedBook = document.querySelector('.view-book');

// function for viewing a specific book
const viewBook = async (event) => {
  event.preventDefault();
  const id = window.location.pathname;
  const response = await fetch(`${id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',},
  });
  console.log(response);
};

if (selectedBook) {
  selectedBook.addEventListener('click', viewBook);
}
