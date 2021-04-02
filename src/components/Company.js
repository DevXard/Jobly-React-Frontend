import {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from './UserContext';
import JoblyAPI from '../api';

import JobsDetails from './JobsDetails';

function Company() {
    const {user} = useContext(UserContext);
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
            {user ?
                <div className="grid justify-items-center">
                <h1 className="text-2xl">{details.name}</h1>
                <p>{details.description}</p>
                {details.jobs ? details.jobs.map((job) => <JobsDetails key={job.id} data={job}/>) : <div>Loading...</div>}
            </div>
            :
            <Redirect to="/" />
            }
        </>
        
    )
}

export default Company;

// 