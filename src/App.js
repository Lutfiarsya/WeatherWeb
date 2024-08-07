import React, { useState } from "react";
import Weather from "./Components/WeatherPage";
import Search from "./Components/Search";
import Apiforecast from "./Components/Forecast/Forecast";


const App = () => {  
  const [search, setSearch] = useState('')

  return (
    <div className="App">
      <Search setSearch={setSearch}/>
      <Weather apiSearch={search}/>
      <Apiforecast />
    </div>
  );
}

export default App;
