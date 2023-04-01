import React from 'react'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import "./dialogStyle.css";

interface formBodyProps {
    name: string,
    inputType?: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any
}
export const FormBody = ({ name, register, registerOptions, inputType = "text", error, ...props }: formBodyProps) => {
    return (
        <>
            <label htmlFor={name} >
                {name}
            </label>
            {(props.textarea) ?
                <textarea
                    {...register(name)}
                    placeholder={name.toLowerCase()}
                    rows={7}
                ></textarea> :
                <input
                    {...register(name, registerOptions)}
                    type={inputType}
                    placeholder={name.toLowerCase()}
                />}

            {/* <p className="invalidMsg">{error?.message}</p> */}
        </>
    )
}
