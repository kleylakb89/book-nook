// require('dotenv').config();
let submitBook = document.querySelector('.submit-book');


const addBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const genre_id = document.querySelector('#genres').value;
  const read = document.querySelector('#has-read');
  const fav = document.querySelector('#favorite');
  // let cover ='';
  // let isbn ='';
  let has_read = false;
  let favorite = false;

  if (read.checked) {
    has_read = true;
  }
  if (fav.checked) {
    favorite = true;
  }
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': '48085_86d037bcde037a43fbe855f18b47d51e'
  };

  const bookResult = await fetch(`https://api2.isbndb.com/books/${title}?page=1&pageSize=20&column=title`, {
    headers: headers,
  });
  const data = await bookResult.json();
  console.log(data);
  const isbn = data.books[0].isbn13;

  console.log(isbn);

  const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  // const cover = await bookResult.json();
  // console.log(cover);

  // const bookResult = await fetch('/api/books/search', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     isbn
  //   }),
  //   headers: {'Content-Type': 'application/json',},
  // });
  // const cover = new Image();
  // cover.src = 'data:image/png;base64,' + await bookResult.json();
  // console.log(cover);

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