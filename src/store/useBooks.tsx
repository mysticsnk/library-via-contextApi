import {
    createContext,
    useContext,
    useReducer,
    type ReactNode,
    type Dispatch
} from "react"

import {
    bookReducer,
    initialState,
    type BooksState,
    type BookAction
} from "./books"

const BooksContext = createContext<{
    state: BooksState;
    dispatch: Dispatch<BookAction>;
} | null>(null)

export const BooksProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState)

    return (
        <BooksContext.Provider value={{ state, dispatch }}>
            {children}
        </BooksContext.Provider>
    )
}

export const useBooks = () => {
    const context = useContext(BooksContext)

    if (!context) {
        throw new Error("useBooks must be used within BooksProvider")
    }

    return context
}