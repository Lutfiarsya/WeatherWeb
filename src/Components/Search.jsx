import { MagnifyingGlass, Sun, Moon } from "phosphor-react"
import { useState } from "react"

const Search = ({setSearch, ubah, setUbah}) => {


const handleChange = (event) => {
    if(event.key === "Enter"){
       setSearch(event.target.value)
    }

}

const handleClick = () => {
    setUbah(!ubah)
}


    return(
        <div className="Container flex flex-row justify-center mt-10">
            <input 
                placeholder="Search Country"
                className={`transition-all duration-1000 ease-in-out transform SearchBar border ml-3 border-solid border-black md:w-[500px] w-80 md:h-12 h-10 text-lg px-5 rounded-3xl ${ubah ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}
                onKeyDown={handleChange}
            />
            <button 
            >
            < MagnifyingGlass size={20}
              className={`relative top-0 right-8 transition-all duration-1000 ease-in-out transform ${ubah ? 'text-white' : 'text-black'}`}
            />
            </button>
            {/* Button Darkmode */}
            <div className={` transition-all duration-1000 ease-in-out transform ${ubah ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900' } w-10 h-10 flex item-center justify-center mt-1 rounded-3xl`} id="darkModeButton">
            <button onClick={() => handleClick()}> 
                {ubah ? <Sun size={20}/> : <Moon size={20}/>}
            </button>
            </div>
        </div>
    )
    
}


export default Search;