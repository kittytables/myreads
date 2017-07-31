import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array,
    shelf: PropTypes.string,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelf, onUpdateBook } = this.props

    let showingBooks = books

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showingBooks.map((book, index) => (
              <li key={index + book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                      style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks) && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(event) => onUpdateBook(book, event.target.value)} value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {(book.authors) &&  book.authors.map((author) => (<div key={author}>{author}</div>))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooks
