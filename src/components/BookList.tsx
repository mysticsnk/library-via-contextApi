import { useReducer, useState } from "react"
import { bookActions, bookReducer, initialState, selectCurrentBooks, type LibraryBook } from "../store/books"
import { useBooks } from "../store/useBooks"
import { Book } from "./Book"

export const BookList = () => {
    const {state, dispatch} = useBooks()
    const books = selectCurrentBooks(state)

    return <ul>
        {books.map(libBook => <Book 
        key={libBook.book.id}
        id={libBook.book.id}
        name={libBook.book.name}
        author={libBook.book.author}
        genre={libBook.book.genre}
        year={libBook.book.year}
        pages={libBook.book.pages}/>)}
        </ul>
}