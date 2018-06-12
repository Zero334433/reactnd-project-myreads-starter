import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render () {
    if (!this.props.data) return null;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.data.filter(book => book.shelf === this.props.shelfId).map((bookData) => {
                return (<Book
                book = { bookData }
                />)
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
