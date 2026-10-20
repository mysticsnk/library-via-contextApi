export type Genre = "fantasy" | "history" | "action" | "sci-fi"
export const genres = ["fantasy", "history", "action", "sci-fi"]

export interface BookDTO {
    name: string,
    author: string,
    genre: Genre,
    year: number, 
    pages: number
}

export interface Book {
    id: number,
    name: string,
    author: string,
    genre: Genre,
    year: number,
    pages: number,
}

export interface LibraryBook {
    book: Book,
    isTaken: boolean
}

const BOOK_ADD = "books/addBook" as const
const BOOK_DELETE = "books/deleteBook" as const
const BOOK_CHANGE = "books/changeBook" as const
const BOOK_BORROW = "books/borrowBook" as const
const BOOK_RETURN = "books/returnBook" as const
const SET_FILTER = "books/setFilter" as const

export const bookActions = {
    addBook: (newBook: BookDTO) => {return {type: BOOK_ADD, payload: newBook}},
    deleteBook: (id: number) => {return {type: BOOK_DELETE, payload: id}},
    changeBook: (id: number, newBook: BookDTO) => {return {type: BOOK_CHANGE, payload: {id, newBook}}},
    borrowBook: (id: number) => {return {type: BOOK_BORROW, payload: id}},
    returnBook: (id: number) => {return {type: BOOK_RETURN, payload: id}},
    setFilter: (filter: Genre | "all") => {return {type: SET_FILTER, payload: filter}}
} as const

export type BookAction = ReturnType<
    (typeof bookActions)[keyof typeof bookActions]
>;

export interface BooksState {
    books: LibraryBook[],
    filter: "all" | Genre
}

export let initialState: BooksState = {
    books: [
        {
            book: {
                id: 0,
                name: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "fantasy",
                year: 1937,
                pages: 310
            },
            isTaken: false
        },
        {
            book: {
                id: 1,
                name: "Harry Potter and the Philosopher's Stone",
                author: "J.K. Rowling",
                genre: "fantasy",
                year: 1997,
                pages: 223
            },
            isTaken: true
        },
        {
            book: {
                id: 2,
                name: "The Guns of August",
                author: "Barbara W. Tuchman",
                genre: "history",
                year: 1962,
                pages: 511
            },
            isTaken: false
        },
        {
            book: {
                id: 3,
                name: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                genre: "history",
                year: 2011,
                pages: 443
            },
            isTaken: false
        },
        {
            book: {
                id: 4,
                name: "The Three Musketeers",
                author: "Alexandre Dumas",
                genre: "action",
                year: 1844,
                pages: 700
            },
            isTaken: true
        },
        {
            book: {
                id: 5,
                name: "The Bourne Identity",
                author: "Robert Ludlum",
                genre: "action",
                year: 1980,
                pages: 523
            },
            isTaken: false
        },
        {
            book: {
                id: 6,
                name: "Dune",
                author: "Frank Herbert",
                genre: "sci-fi",
                year: 1965,
                pages: 412
            },
            isTaken: false
        },
        {
            book: {
                id: 7,
                name: "The Martian",
                author: "Andy Weir",
                genre: "sci-fi",
                year: 2011,
                pages: 369
            },
            isTaken: true
        }
    ],
    filter: "all"
};

let currentBook = 8

export const bookReducer = (state: BooksState = initialState, action: BookAction): BooksState => {
    switch (action.type){
        case BOOK_ADD:
            return {
                ...state,
                books: [
                    ...state.books,
                    {book:{...action.payload, id: currentBook++}, isTaken: false}
                ]
            }
        case BOOK_DELETE:
            return {
                ...state,
                books: state.books.filter(libBook => libBook.book.id !== action.payload)
            }
        case BOOK_CHANGE:
            return {
                ...state,
                books: state.books.map(libBook => {
                    if (libBook.book.id === action.payload.id) {
                        return {book:{...action.payload.newBook, id:libBook.book.id}, isTaken: false}
                    }
                    return libBook
                })
            }
        case BOOK_BORROW:
            return {
                ...state,
                books: state.books.map(libBook => {
                    if (libBook.book.id === action.payload) {
                        return {book:libBook.book, isTaken: true}
                    }
                    return libBook
                })
            }
        case BOOK_RETURN:
            return {
                ...state,
                books: state.books.map(libBook => {
                    if (libBook.book.id === action.payload) {
                        return {book:libBook.book, isTaken: false}
                    }
                    return libBook
                })
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state
    }
}

export const selectCurrentBooks = (state: BooksState): LibraryBook[] => {
    let filteredBooks = state.filter === "all"
        ? state.books
        : state.books.filter(libBook => libBook.book.genre === state.filter)

    filteredBooks = filteredBooks.filter(book => book.isTaken === false)

    return filteredBooks
}
