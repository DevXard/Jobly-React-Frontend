import {useState, useEffect} from 'react';
import JoblyAPI from '../api';
import {Redirect} from 'react-router-dom';
import {toLowerCase} from "../helpers/helpers"

import JobsDetails from './JobsDetails';
import Search from './Search';



const Jobs = ({user, setUserInfo}) => {
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
            {user.username ? 
            <div className="grid justify-items-center">
                <Search filter={filterJobs}/>
                {jobs ? jobs.map(job => <JobsDetails key={job.id} user={user} data={job} setUserInfo={setUserInfo} />) : <div>Loading...</div>}
            </div>
            :
            <Redirect to='/' />
            }
        </>
        
    )
}

export default Jobs;