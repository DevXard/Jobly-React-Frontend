import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from './UserContext';

const Loging = () => {

    const {login} = useContext(UserContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    

    const handleChange = (e) => {
        e.preventDefault();
        const{name, value} = e.target

        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
        history.push("/")
    }

    return(
        <div className="w-full max-w-xs justify-self-center mt-5  ">
            <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Login
                </button>
            </div>
            </form>
        </div>
    )
}

export default Loging;