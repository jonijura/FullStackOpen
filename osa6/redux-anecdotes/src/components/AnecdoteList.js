import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addVote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes).slice()
    const filter = useSelector(state => state.filter)
    const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    const handleLike = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(`you voted for '${anecdote.content}'`))
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {
                filtered.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleLike(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList