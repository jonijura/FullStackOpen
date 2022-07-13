import { useParams } from 'react-router-dom';

const Anecdote = (props) => {
    const id = parseInt(useParams().id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>
                has {anecdote.votes} votes <br />
                for more info see 
                <a href={anecdote.info}> {anecdote.info}</a>
            </p>
        </div>
    )
}

export default Anecdote;