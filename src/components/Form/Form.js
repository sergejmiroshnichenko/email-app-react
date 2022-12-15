import React from 'react';


const Form = ({children, width,...props}) => {
    return (
        <form noValidate {...props}>{children}</form>
    )
}

export default Form

