import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  searchBooks = (query) => {
    var books;

    BooksAPI.search(query, 20).then((results) => {
      if(results && !results.error) {
        books = results.map((book) => {
          return BooksAPI.get(book.id);
        });

        Promise.all(books).then((final) =>
          this.setState({ results: final })
        )};
    }).catch((e) => {
      this.setState({ results: [] });
      console.log(e);
    });
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({ query: query }, this.searchBooks(query));
    } else {
      this.setState({ query: query, results: [] });
    }
  }

  clearQuery = () => {
    this.setState({ query: '' });
  }

  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.searchBooks(this.state.query);
      this.props.getBooks();
    });
  }

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={results}
            onUpdateBook={this.onUpdateBook}
            shelf="Search Results"/>
        </div>
      </div>
    )
  }
}

export default Search
