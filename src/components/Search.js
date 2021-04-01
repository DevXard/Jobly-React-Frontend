import{useState} from 'react';
import "../Styles/Search.css"
const Search = ({filter}) => {
    const [formData, setFormData] = useState('')
    
    const handleChange = e => {
        e.preventDefault();
        setFormData(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        filter(formData)
        setFormData('')
    }

    return (
        <div className=" mt-2 w-5/6 ">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <input
                        value={formData}
                        onChange={handleChange}
                        className="border-2 w-9/12 p-1 h-10 mt-3 rounded-md border-indigo-200 focus:ring-2 focus:ring-blue-600"/>
                    <button className=" border-2 rounded-md p-1 m-3 bg-indigo-500 border-indigo-500 focus:outline-none">Submit</button>
                </div> 
            </form>
        </div>
    )
}

export default Search;