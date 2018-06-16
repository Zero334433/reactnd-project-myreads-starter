import React, { Component } from 'react'

class Book extends Component {


  onChangeFunc = (evt) => {
    this.props.shelfChange(evt.target.value, this.props.book);
  }


  //A Helper function to decide if the Book is actually on the front Page or on the Search Page
  renderSearchPage = () => {
    if(this.props.search) {
      let bookObj = this.props.booksInShelf.find((book) => book.id === this.props.book.id);
      if (bookObj) {
        let shelfStr = bookObj.shelf.split(/(?=[A-Z])/).join(' ');
        shelfStr = shelfStr[0].toUpperCase() + shelfStr.substring(1);
        return (
          <div className="book-authors">Currently in Shelf: { shelfStr }</div>
        )
      }
    }
  }

  //A Function to get the correct shelf the book is inspect
  getShelfOfBook = () => {
    if(this.props.search) {
      let bookObj = this.props.booksInShelf.find((book) => book.id === this.props.book.id);
      if (bookObj) {
        return bookObj.shelf;
      }
      else {
        return 'none';
      }
    }

    return this.props.book.shelf;
  }

  render () {
    let authors = '';
    if(this.props.book.authors) {
      for (let author of this.props.book.authors) {
        authors ? authors = authors + ', ' + author : authors = author;
      }
    }

    let imgLink;
    this.props.book.imageLinks? imgLink = this.props.book.imageLinks.thumbnail : imgLink = '';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imgLink}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(evt) => this.onChangeFunc(evt)}>
                <option value="move" disabled>Move to...</option>
                <option className="hidden"></option>
                <option value="currentlyReading" selected={this.getShelfOfBook() === "currentlyReading"}>Currently Reading</option>
                <option value="wantToRead" selected={this.getShelfOfBook() === "wantToRead"}>Want to Read</option>
                <option value="read" selected={this.getShelfOfBook() === "read"}>Read</option>
                <option value="none" selected={this.getShelfOfBook() === "none"}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ this.props.book.title }</div>
          <div className="book-authors">{ authors }</div>
          { this.renderSearchPage() }
        </div>
      </li>
    )
  }
}

export default Book
