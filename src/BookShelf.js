import React from 'react'
import Book from './Book'

const BookShelf = (props) =>  {
    if (!props.data) return null;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ props.shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              props.data.filter(book => book.shelf === props.shelfId).map((bookData) => {
                return (<Book
                book = { bookData }
                shelfChange = {props.shelfChange}
                key = {bookData.id}
                />)
              })
            }
          </ol>
        </div>
      </div>
    )
}

export default BookShelf
