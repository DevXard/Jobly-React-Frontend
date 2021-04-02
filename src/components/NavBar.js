import { Link } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from './UserContext';

const NavBar = () => {
    const {user, logout} = useContext(UserContext)

    const logedIn = () => {
        return(
            <div className="">
            

            <div className="pr-8 md:block">
                <p className=" absolute bottom-5 left-5 ">{user.username}</p>
                <Link className='p-4' to="/companies" >Companies</Link>
                <Link className='p-4' to="/jobs" >Jobs</Link>
                <Link className='px-5 py-1 bg-green-500 rounded-xl absolute bottom-4 right-24' to="/profile" >Profile</Link>
            </div>
            <button className="focus:outline-none absolute bottom-5 right-5" onClick={() => logout()}>Log Out</button>
            </div>
        )
    }
   
    const logedOut = () => {
        return (
             <div className="pr-8 md:block justify-self-center">
                

                <Link className='p-4' to="/login" >Login</Link>
                <Link className='p-4' to="/signup" >Sign Up</Link>
             </div> 
        )
    }



    return (
        <nav className="flex justify-center items-center h-16 bg-white text-black
         relative shadow-sm " role="navigation">
         <Link className='p-4 absolute bottom-1 left-0' to="/" >Jobly</Link>
         {user ? logedIn() : logedOut()}
        </nav>
    )
}

export default NavBar;