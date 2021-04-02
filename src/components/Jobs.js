import {useState, useEffect} from 'react';
import JoblyAPI from '../api';
import {Redirect} from 'react-router-dom';
import {toLowerCase} from "../helpers/helpers"
import {useContext} from 'react';
import UserContext from './UserContext';

import JobsDetails from './JobsDetails';
import Search from './Search';



const Jobs = ({setUserInfo}) => {

    const {user} = useContext(UserContext);

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const allJobs = async() => {
            let res = await JoblyAPI.getJobs()
            setJobs(res)
        }
        allJobs()
    },[])

    const filterJobs = async(query) => {
        let res = await JoblyAPI.getJobs()
        const filtered = res.filter(({title}) => toLowerCase(title).includes(toLowerCase(query)))
        setJobs(filtered)
    }
    
    return(
        <>
            {user ? 
            <div className="grid justify-items-center">
                <Search filter={filterJobs}/>
                {jobs ? jobs.map(job => <JobsDetails key={job.id} data={job} />) : <div>Loading...</div>}
            </div>
            :
            <Redirect to='/' />
            }
        </>
        
    )
}

export default Jobs;