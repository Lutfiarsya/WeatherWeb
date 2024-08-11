import React, { useState } from "react";
import Weather from "./Components/WeatherPage";
import Search from "./Components/Search";
import Maps from "./Components/Maps/weatherMaps";


const App = () => {  
  const [search, setSearch] = useState('')

  return (
    <div className="App flex flex-col">
      <div className="flex flex-col">
      <Search setSearch={setSearch}/>
      <Weather apiSearch={search}/>
      </div>
    </div>
  );
}

export default App;
