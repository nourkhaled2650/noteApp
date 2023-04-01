import React from 'react'
interface formTitleProps {
    formType: string
}
export const FormTitle = ({ formType }: formTitleProps) => {
    if (formType == "update") {
        return <h1>Update Note</h1>
    } else if (formType == "add") {
        return <h1> Add Notes</h1>
    } else if (formType == "signup") {
        return <h1> Sign Up</h1 >
    } else if (formType == "login") {
        return <h1> Log In</h1 >
    } else {
        return <h1></h1 >
    }
}
