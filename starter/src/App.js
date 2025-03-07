import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import Main from "./Main";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
function App() {
  useEffect(() => {
    BooksAPI.getAll().then((result) => {
      setBooksArray(result);
      //console.log(result);
    });
  }, []);

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const updatedBooks = booksArray
        .filter((b) => b.id !== book.id)
        .concat({
          ...book,
          shelf,
        });
      //console.log(updatedBooks);
      setBooksArray(updatedBooks);
    });
  };
  const [booksArray, setBooksArray] = useState([]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={
            <Search books={booksArray} updateBookShelf={updateBookShelf} />
          }
        />

        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Main books={booksArray} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
