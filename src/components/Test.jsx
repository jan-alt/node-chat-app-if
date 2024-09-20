import React, { useEffect } from 'react'

const Test = () => {
    const [message, setMessage] = React.useState('')
    useEffect(() => {
        fetch('http://localhost:5000')
            .then(res => res.json())
            .then(res => setMessage(res.message))
    })

    return (
        <>
            Test  {message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </>
    )
}

export default Test