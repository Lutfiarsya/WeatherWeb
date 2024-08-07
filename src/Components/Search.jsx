import { MagnifyingGlass } from "phosphor-react"





const Search = ({setSearch}) => {


const handleChange = (event) => {
    if(event.key === "Enter"){
       setSearch(event.target.value)
    }

}


    return(
        <div className="Container flex flex-row justify-center mt-10">
            <input 
                placeholder="Search Country"
                className="SearchBar border border-solid border-black w-96 h-8 p-3 rounded-xl"
                onKeyDown={handleChange}
            />
            <button 
            >
            < MagnifyingGlass size={18}
              className="relative top-0 right-6" 
            />
            </button>
        </div>
    )
    
}


export default Search;