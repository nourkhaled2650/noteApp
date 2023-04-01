import React from 'react'
import "../component/navBar.css"

interface navBarProps {
    authenticated: boolean,
    username: string,
    loginClicked: () => void
    signupClick: () => void
    logoutClicked: () => void
}
export const NavBar = ({ authenticated, username, loginClicked, signupClick, logoutClicked }: navBarProps) => {
    return (
        <div className='navContainer'>
            <h2>Cool Notes App</h2>
            <div className='userContainer'>
                {authenticated ?
                    <>
                        <p className='userInfo'>{username}</p>
                        <button className='userInfo' onClick={logoutClicked}>Log Out</button>
                    </> :
                    <>
                        <button className='userInfo' onClick={signupClick}>Sign Up</button>
                        <button className='userInfo' onClick={loginClicked}>Log In</button>
                    </>}
            </div>
        </div >
    )
}
