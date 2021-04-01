import {Link} from 'react-router-dom';

const Welcome = ({name}) => {
    
    return (
        <div className="justify-self-center">
        {name ?
            <h1 className=" text-2xl">Welcome {name}</h1> 
            : 
            <div className="justify-self-center mt-5 text-2xl font-sans">
                <h1 className=" flex justify-center">Welcome</h1>
                    <div  className="flex mt-5 justify-center">
                    <Link className="mr-3 border border-gray-300 bg-blue-200 rounded-md p-1 text-base" to="/login" >Log In</Link>
                    <Link className="ml-3 border border-gray-300 bg-blue-200 rounded-md p-1 text-base" to="/signup" >Sign Up</Link>
                </div>
        
            </div>
           
        }
        </div>
    )
}

export default Welcome;