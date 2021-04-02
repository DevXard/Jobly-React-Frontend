import JoblyAPI from '../api'
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {user} = useContext(UserContext);
    
    const [formData, setFormData] = useState({
        
        firstName: '' ,
        lastName: '' ,
        email: '' ,
        password: ''
    })

    
    
    useEffect(() => {
        
        if(user){
            setFormData(formData => ({
                ...formData,
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email
            }))
        }
       
    },[user])
    
    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await JoblyAPI.editUserProfile(user.user.username, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            })
            
            
        }catch(e){
            console.log(e)
        }
        
        
    }
    
    if(!user){
        return <div className="justify-self-center mt-5 text-2xl font-sans">
                <h1 className="flex justify-center">You have to login or sign up first</h1>
                    <div  className="flex mt-5 justify-center">
                    <Link className="mr-3 border border-gray-300 bg-blue-200 rounded-md p-1 text-base" to="/login" >Log In</Link>
                    <Link className="ml-3 border border-gray-300 bg-blue-200 rounded-md p-1 text-base" to="/signup" >Sign Up</Link>
                </div>
        
            </div>
    }

    return (
        <div className="w-full max-w-xs justify-self-center mt-5  ">
            <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Username
                </label>
                    {user.user ? <h3>{user.user.username}</h3> : <h3>Loading...</h3>}
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                </label>
                <input 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder={"First Name"}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                </label>
                <input 
                    id="lastNmae"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Last Name"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    E-mail
                </label>
                <input 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="E-mail"/>
            </div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Counfurm changes password
                </label>
                <input 
                    id="password"
                    name="password"
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************" />
                
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Sign UP
                </button>
            </div>
            </form>
        </div>
    )
}

export default Profile;