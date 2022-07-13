import { useNavigate } from 'react-router-dom'
import {useField} from '../hooks'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
        props.setNotification(`Anecdote ${content.value} created!`)
    }

    const resetFields = () => {
        content.reset()
        author.reset()
        info.reset()
    }
    const red = (data) => {
        const {reset, ...rest} = data
        return rest
    }
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...red(content)} />
                </div>
                <div>
                    author
                    <input {...red(author)} />
                </div>
                <div>
                    url for more info
                    <input {...red(info)} />
                </div>
                <button type="submit">create</button><button type="button" onClick={resetFields}>reset</button>
            </form>
        </div>
    )}

export default CreateNew