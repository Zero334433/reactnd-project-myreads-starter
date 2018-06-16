import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Route, Link, Switch } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import errorPage from './404'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allShelfs: [
      {id: 'currentlyReading', name: 'Currently Reading'},
      {id: 'wantToRead', name: 'Want to Read'},
      {id: 'read', name: 'Read'}
    ]
  }

  //Function to change the Shelf the book is stored in
  changeShelf = (shelfName, changeBook) => {
    const indexOfBook = this.state.allData.findIndex(book => book.id === changeBook.id);
    this.setState((state) => {
      let newData = state.allData;
      if(shelfName === 'none') {
        newData.splice(indexOfBook, 1)
      }
      else {
        if (newData[indexOfBook]) newData[indexOfBook].shelf = shelfName
        else {
          changeBook.shelf = shelfName;
          newData.push(changeBook);
        }
      }

      return {allData: newData};
    })
    BooksAPI.update(changeBook, shelfName);
  }

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState({
        allData: res
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {
                    this.state.allShelfs.map(shelf => {
                    return  (<BookShelf
                      shelfName = { shelf.name }
                      shelfId = { shelf.id }
                      data = {this.state.allData}
                      shelfChange = {this.changeShelf}
                      key = {shelf.name}
                      />)
                    })
                  }
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
        <Route exact path="/search" render={() => (
              <SearchBooks shelfChange = {this.changeShelf}
                           booksInShelf = {this.state.allData}/>
              )}/>
            <Route component={errorPage}/>
        </Switch>
    </div>

        )}
  }

export default BooksApp
