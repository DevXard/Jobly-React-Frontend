import {Link} from 'react-router-dom';

import "../Styles/CompanyCard.css"
const CompanyCard = ({data}) => {
    
    return (
        <Link to={`/companies/${data.handle}`} className=" p-3 m-3 h-28 w-5/6 bg-white  shadow-sm border relative transition duration-500 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-101">
            <h1 className="flex justify-start mb-5 text-1xl font-semibold">{data.name || data.title} </h1>
            
            <div className="absolute bottom-13 left-4">
                <p className=" text-sm ">{data.description ||  data.salary}</p>
                {data.equity ? <p className=" text-sm ">Equity: {data.equity}</p> : null}
            </div>
            
           
            <div className="logo">
            <img alt={data.name} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fliquipedia.net%2Fcommons%2Fimages%2Ff%2Ffc%2FPhoenix1_Logo.png&f=1&nofb=1"/>
            </div>
            
        </Link>
    )
}

export default CompanyCard;