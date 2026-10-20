import { useReducer, useState } from "react"
import { bookReducer, initialState, type Genre, genres, bookActions} from "../store/books"
import { useBooks } from "../store/useBooks"

export const BookForm = () => {
    const {dispatch} = useBooks()
    let [name, setName] = useState("")
    let [author, setAuthor] = useState("")
    let [genre, setGenre] = useState<Genre>("fantasy")
    let [year, setYear] = useState<number | "">("")
    let [pages, setPages] = useState<number | "">("")

    const submitForm = () => {
        if (year === "") return
        if (pages === "") return

        dispatch(bookActions.addBook({name, author, genre, year, pages}))

        setName("")
        setAuthor("")
        setGenre("fantasy")
        setYear("")
        setPages("")
    }

    return <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
        <select value={genre} onChange={(e) => setGenre(e.target.value as Genre)}>
            {genres.map(genre => <option value={genre}>{genre}</option>)}
        </select>
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(+e.target.value)}/>
        <input type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(+e.target.value)}/>
        <button type="submit" onClick={submitForm}>Add Book</button>
    </div>
}