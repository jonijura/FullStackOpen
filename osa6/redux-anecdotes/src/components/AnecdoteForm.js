import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => createAnecdote(e)}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm