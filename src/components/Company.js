import {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import JoblyAPI from '../api';

import JobsDetails from './JobsDetails';

function Company({user, setUserInfo}) {
    const [details, setDetails] = useState([])
    const {name} = useParams()
    
    useEffect(() => {

        const CompanyDetails = async() => {
            let res = await JoblyAPI.getCompany(name)
            setDetails(res)
        }
        CompanyDetails()
    },[name])

    
    return (
        <>
            {user.username ?
                <div className="grid justify-items-center">
                <h1 className="text-2xl">{details.name}</h1>
                <p>{details.description}</p>
                {details.jobs ? details.jobs.map((job) => <JobsDetails key={job.id} user={user} setUserInfo={setUserInfo} data={job}/>) : <div>Loading...</div>}
            </div>
            :
            <Redirect to="/" />
            }
        </>
        
    )
}

export default Company;

// 