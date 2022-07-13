import { useState, useEffect } from "react"

const Notification = ({ notification }) => {
    const [msg, setMsg] = useState()

    // causes problems with multiple notifications and on initial load
    useEffect(() => {
        setMsg(notification)
        setTimeout(() => {
            setMsg('')
        }, 5000)
    }, [notification])

    if (msg === '') {
        return null
    }

    const style = {
        color: 'black',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={style}>
            {msg}
        </div>
    )
}

export default Notification