import { useDispatch, useSelector} from "react-redux"

import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    return (
        <div>
            <h2>Anecdotes</h2>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList