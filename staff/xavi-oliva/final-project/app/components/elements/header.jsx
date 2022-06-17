import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProfileButton, LogoutButton } from '../buttons'

export const Header = ({ className, ...props }) => {
    const router = useRouter()

    const handleHomeCLick = () => {
        router.push('/')
    }

    const handleProfileClick = () => {
        router.push('/profile')
    }
    
    const handleLogoutClick = () => {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        
        router.push('/login')
    }

    // useEffect(() => {
    //     logger.info('componentDidMount')

    //     if (isJwtValid(sessionStorage.token))
    //         retrieveUser(sessionStorage.token, (error, user) => {
    //             if (error) {
    //                 handleFeedback({ level: 'error', message: error.message })

    //                 handleLogout()

    //                 return
    //             }

    //             // setState({ name: user.name, view: 'list' })
    //             setName(user.name)
    //             setView('stickerList')
    //         })
    //     else navigate('/login')
    // }, [])

    return <>
        <header {...props}
            className={`${className} sticky top-0 z-50
                w-full h-16 bg-white border-b-2 border-primary py-2 px-1`}>
            <nav className="h-full flex justify-between items-center">
                <div className='pl-3'>
                    <h1 onClick={handleHomeCLick} 
                        className='t-logo text-lg cursor-pointer'>Brun's <span className='text-secondary'>Flats</span></h1>
                </div>
                <div className="flex justify-around gap-3.5 pt-1 pr-2.5">
                    <ProfileButton onClick={handleProfileClick} />
                    <LogoutButton onClick={handleLogoutClick} />
                </div>
            </nav>
        </header>
    </>
}