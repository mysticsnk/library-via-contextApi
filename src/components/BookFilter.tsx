import { useEffect, useReducer, useState } from "react"
import { bookReducer, initialState, type Genre, genres , bookActions} from "../store/books"
import { useBooks } from "../store/useBooks"

export const BookFilter = () => {
    const {dispatch} = useBooks()
    const [filter, setFilter] = useState<Genre | "all">("all")

    useEffect(() => {
        dispatch(bookActions.setFilter(filter))
    }, [filter])

    return <select value={filter} onChange={(e) => setFilter(e.target.value as Genre)}>
        <option value="all">All</option>
        {genres.map(genre => <option value={genre}>{genre}</option>)}
    </select>
}