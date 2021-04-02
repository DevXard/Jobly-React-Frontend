import {useState, useEffect} from 'react';

const Storege = (key, username=null) => {
    const value = localStorage.getItem(key) || username;
    const [state, setState] = useState(value)
    
    useEffect(() => {
        if(state === null) {
            localStorage.removeItem(key)
        }else {
            localStorage.setItem(key, state)
        }

    }, [key, state])
    
    return [state, setState]
}

export default Storege;