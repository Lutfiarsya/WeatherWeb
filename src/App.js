import React, { useState } from "react";
import Weather from "./Components/WeatherPage";
import Search from "./Components/Search";
import Maps from "./Components/Maps/weatherMaps";



const App = () => {  
  const [search, setSearch] = useState('')
  const [ubah, setUbah] = useState(false)

  return (
    <div className="App flex flex-col">
      <div className="flex flex-col">
      <Search setSearch={setSearch} ubah={ubah} setUbah={setUbah}/>
      <Weather apiSearch={search} darkMode={ubah} setDarkmode={setUbah}/>
      </div>
    </div>
  );
}

export default App;
