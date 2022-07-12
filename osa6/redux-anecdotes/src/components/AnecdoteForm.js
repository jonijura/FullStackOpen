import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        props.createAnecdote(event.target.anecdote.value)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => addAnecdote(e)}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(null,{createAnecdote})(AnecdoteForm)