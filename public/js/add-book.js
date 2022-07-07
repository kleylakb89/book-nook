let submitBook = document.querySelector('.submit-book');


const addBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const genre_id = document.querySelector('#genres').value;
  const read = document.querySelector('#has-read');
  const fav = document.querySelector('#favorite');
  let has_read = false;
  let favorite = false;

  if (read.checked) {
    has_read = true;
  }
  if (fav.checked) {
    favorite = true;
  }

  const response = await fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify({
      title,
      author,
      has_read,
      favorite,
      genre_id,
    }),
    headers: {'Content-Type': 'application/json',},
  });
  if(response.ok) {
    document.location.replace('/books');
  }
};

submitBook.addEventListener('click', addBook);