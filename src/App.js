import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: []
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.getBooks())
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
        wantToRead: books.filter((book) => book.shelf === "wantToRead"),
        read: books.filter((book) => book.shelf === "read")
      })
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  books={this.state.currentlyReading}
                  shelf="Currently Reading"
                  onUpdateBook={this.updateBook}/>
                <ListBooks
                  books={this.state.wantToRead}
                  shelf="Want to Read"
                  onUpdateBook={this.updateBook}/>
                <ListBooks
                  books={this.state.read}
                  shelf="Read"
                  onUpdateBook={this.updateBook}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <Search getBooks={this.getBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
