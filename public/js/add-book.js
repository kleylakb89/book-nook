// require('dotenv').config();
let submitBook = document.querySelector('.submit-book');

// function to add a book to the database
const addBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const genre_id = document.querySelector('#genres').value;
  const read = document.querySelector('#has-read');
  const fav = document.querySelector('#favorite');

  let has_read = false;
  let favorite = false;

  // checking checkbox value and setting boolean based on it
  if (read.checked) {
    has_read = true;
  }
  if (fav.checked) {
    favorite = true;
  }
  // headers for the api fetch
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': '48085_86d037bcde037a43fbe855f18b47d51e'
  };

  // fetching the isbn to use for finding the book cover
  const bookResult = await fetch(`https://api2.isbndb.com/books/${title}?page=1&pageSize=20&column=title`, {
    headers: headers,
  });
  const data = await bookResult.json();
  const isbn = data.books[0].isbn13;

  const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  // fetch request to post the new book
  const response = await fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify({
      title,
      author,
      has_read,
      favorite,
      cover,
      genre_id,
    }),
    headers: {'Content-Type': 'application/json',},
  });
  if(response.ok) {
    document.location.replace('/books');
  }
};

submitBook.addEventListener('click', addBook);