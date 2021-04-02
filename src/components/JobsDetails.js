import JoblyAPI from '../api'
import {useContext} from 'react';
import UserContext from './UserContext';

const JobsDetails = ({data}) => {
    const {user, applications, setApplications} = useContext(UserContext);
    const handleApply = async () => {
        await JoblyAPI.jobApplication({username: user.user.username, jobId:data.id})
        setApplications(new Set([...applications, data.id]))
        
    }
    console.log(applications)

    return (
        <div to="/" className=" p-3 m-3 h-36 w-5/6 bg-white  shadow-sm border relative transition duration-100 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-105">
            <h1 className="flex justify-start mb-2 text-1xl font-semibold">{data.title} </h1>
            <h3 className="flex justify-start mb-5">{data.companyName}</h3>
            
            <div className="absolute bottom-13 left-4">
                <p className=" text-xs ">Salary: {data.salary || "None"}</p>
                <p className=" text-xs ">Equity: {data.equity || "None"}</p>
            </div>
            
            {applications.has(data.id) ?
            <button  className="absolute bottom-0 right-5 h-8 w-20 bg-red-300 rounded-md mb-3 text-white focus:outline-none">APLLYED</button>
            : <button onClick={handleApply} className="absolute bottom-0 right-5 h-8 w-20 bg-red-500 rounded-md mb-3 text-white">APLLY</button> } 
            
            
        </div>
    )
}

export default JobsDetails;

