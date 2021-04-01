import {useState, useEffect} from 'react';
import JoblyAPI from '../api';

const Storege = () => {
    
    const [state, setState] = useState({})
    
    useEffect(() => {
        if(state.username) {
            const getUserInfo = async () => {
                let result = await JoblyAPI.getUser(state.username, state.token);
                result.user["token"] = state.token
                let saveUser = result;
                
                window.localStorage.setItem('user', JSON.stringify(saveUser))
                setState(result)
            }
       
            getUserInfo()
        }
    }, [state])
    
    return [state, setState]
}

export default Storege;