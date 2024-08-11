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
                className="SearchBar border ml-3 border-solid border-black md:w-[500px] w-80 md:h-12 h-10 text-lg px-5 rounded-3xl"
                onKeyDown={handleChange}
            />
            <button 
            >
            < MagnifyingGlass size={20}
              className="relative top-0 right-8" 
            />
            </button>
        </div>
    )
    
}


export default Search;