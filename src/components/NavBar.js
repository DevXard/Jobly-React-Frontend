import { Link } from 'react-router-dom';
const NavBar = ({name, logout}) => {

    const handleLogout = (e) => {
        
        e.preventDefault();
        logout();
    }
    return (
        <nav className="flex justify-center items-center h-16 bg-white text-black
         relative shadow-sm" role="navigation">
         <p className=" absolute bottom-5 left-5 ">{name || null}</p>
         <div className="pr-8 md:block">
            <Link className='p-4' to="/" >Home</Link>
            <Link className='p-4' to="/companies" >Companies</Link>
            
            <Link className='p-4' to="/jobs" >Jobs</Link>
            <Link className='p-4' to="/login" >Login</Link>
            <Link className='p-4' to="/signup" >Sign Up</Link>
            <Link className='p-4' to="/profile" >Profile</Link>
         </div>
            <button className="focus:outline-none" onClick={handleLogout}>Log Out</button>
        </nav>
    )
}

export default NavBar;