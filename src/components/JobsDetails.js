import JoblyAPI from '../api'

const JobsDetails = ({data, user, setUserInfo}) => {

    const handleApply = async () => {
        await JoblyAPI.jobApplication({username: user.username, jobId:data.id})
        let res = await JoblyAPI.getUser(user.username, user.token)
        setUserInfo(res.user)
    }

    return (
        <div to="/" className=" p-3 m-3 h-36 w-5/6 bg-white  shadow-sm border relative transition duration-100 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-105">
            <h1 className="flex justify-start mb-2 text-1xl font-semibold">{data.title} </h1>
            <h3 className="flex justify-start mb-5">{data.companyName}</h3>
            
            <div className="absolute bottom-13 left-4">
                <p className=" text-xs ">Salary: {data.salary || "None"}</p>
                <p className=" text-xs ">Equity: {data.equity || "None"}</p>
            </div>
            
            {user.applications.includes(data.id) ?
            <button  className="absolute bottom-0 right-5 h-8 w-20 bg-red-300 rounded-md mb-3 text-white focus:outline-none">APLLY</button>
            : <button onClick={handleApply} className="absolute bottom-0 right-5 h-8 w-20 bg-red-500 rounded-md mb-3 text-white">APLLY</button> } 
            
            
        </div>
    )
}

export default JobsDetails;

