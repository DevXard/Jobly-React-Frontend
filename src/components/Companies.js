import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from './UserContext';
import JoblyAPI from '../api'

import CompanyCard from './CompanyCard'
import Search from './Search'

const Companies = () => {
    const { user } = useContext(UserContext);
    const [companies, setCompanies] = useState([])
    
    useEffect(() => {

        const companiesList = async () => {
            let res = await JoblyAPI.getCompanies()
            setCompanies(res)
        }
        companiesList()
    },[])
    
    
    const filterCompanies = async (query) =>{
        let res = await JoblyAPI.getCompanies()
        const filtered = res.filter(({name}) => name.includes(query))
        setCompanies(filtered)
    }

    return (
        <>
            {user.user.username ? 
                <div className=' grid justify-items-center'>
                <Search filter={filterCompanies}/>
                {companies.map((data) => <CompanyCard key={data.handle} data={data}>hi</CompanyCard>)}
                </div>
                : 
                <Redirect to={'/'} />
            } 
        </>
        
        
        
    )
}

export default Companies;