import { useState } from "react";
import { bookActions, genres, type Book as BookType, type Genre } from "../store/books";
import { useBooks } from "../store/useBooks";

export const Book = (props : BookType) => {
    const {state, dispatch} = useBooks()
    const [isEditing, setIsEditing] = useState(false)
    let [name, setName] = useState(props.name)
    let [author, setAuthor] = useState(props.author)
    let [genre, setGenre] = useState<Genre>(props.genre)
    let [year, setYear] = useState<number>(props.year)
    let [pages, setPages] = useState<number>(props.pages)

    return <div key={props.id}>
        {isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> : <h3>{props.name}</h3>}
        {isEditing ? <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/> : <p>{props.author}</p>}
        {isEditing ? 
            <select value={genre} onChange={(e) => setGenre(e.target.value as Genre)}>
                {genres.map(genre => <option value={genre}>{genre}</option>)}
            </select> 
                    :
        <p>{props.genre}</p>
        }

        {isEditing ? <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(+e.target.value)}/> : <p>{year}</p>}
        {isEditing ? <input type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(+e.target.value)}/> : <p>Pages: {pages}</p>}
        <button onClick={() => dispatch(bookActions.deleteBook(props.id))}>Delete</button>
        <button onClick={() => {
            if (isEditing) {
                dispatch(bookActions.changeBook(props.id, {name, author, genre, year, pages}))
            }
            setIsEditing(!isEditing)
        }}>{isEditing ? "Save" : "Edit"}</button>
    </div>
}