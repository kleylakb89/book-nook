let submitBook = document.querySelector('.submit-book');


const addBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const genre_id = document.querySelector('#genres').value;
  const read = document.querySelector('#has-read');
  const fav = document.querySelector('#favorite');
  let cover ='';
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

  fetch(`https://api2.isbndb.com/books/${title}?page=1&pageSize=20&column=title`, {headers: headers})
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      cover = (data.books[0].image);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  // const cover = await bookResult.json();
  // console.log(cover);

  // const bookResult = await fetch('/api/books/search', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     title
  //   }),
  //   headers: {'Content-Type': 'application/json',},
  // });
  // const cover = await bookResult.json();
  // console.log(cover);

  console.log(cover);
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