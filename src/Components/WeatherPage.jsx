
import { useState, useEffect } from 'react';
import cloudy from '../Assets/cloudy.png'
import rain from '../Assets/rain.png'
import foggy from '../Assets/foggy.png'
import sun from '../Assets/sunny.png'
import thunder from '../Assets/thunder.png'
import {dataCuaca} from '../libs/apicall'
import Apiforecast from './Forecast/Forecast';

const Weather = ({apiSearch, darkMode, setDarkmode}) => {
  const [data, setData] = useState("")
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  const url = dataCuaca(`weather?q=${apiSearch}`)


  //fetch API
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, [apiSearch]);

  

  const weatherForecast = data.id


  const farenheit = [data.main?.temp.toFixed(), data.main?.feels_like.toFixed(), data.main?.temp_max.toFixed(), data.main?.temp_min.toFixed()]

  const MainTemp = Math.round(5/9 * (farenheit[0] - 32))
  const FeelsLike = Math.round(5/9 * (farenheit[1] - 32))
  const HighTemp = Math.round(5/9 * (farenheit[2] - 32))
  const LowTemp = Math.round(5/9 * (farenheit[3] - 32))




  //Change weather logo
  const handleLogo = (logo) => {
    {data?.weather?.map((items) => {
      if(items.main === 'Rain'){
        logo = rain
      }else if(items.main === 'Clouds'){
        logo = cloudy
      }else if(items.main === 'Clear'){
        logo = sun
      }else if(items.main === 'Thunderstorm'){
        logo = thunder
      }else if(items.main === 'Haze'){
        logo = foggy
      }
    })}
    return logo  
  }


  //change Background
  useEffect(() => {
    const changeBackground =  darkMode ? `url(${require('../Assets/MoonSky.jpg')})` : `url(${require('../Assets/Sunrise.jpg')})`;
    document.body.style.backgroundImage = changeBackground;
  },[darkMode])



  return (
    <div>
      {data && (
        <>
          <div className=" flex justify-center items-center mt-10">
            <h1 className={`location font-bold text-5xl font-[Firasans] transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'}`}>
              {data.name}
            </h1>
          </div>
          <div className='flex max-sm:flex-col h-56 lg:flex-row md:justify-around my-12'>
           <div className={`flex md:w-1/3 md:h-72 max-sm:h-60 max-sm:m-auto max-sm:mb-8 max-sm:w-[360px] max-sm:px-2 items-center border rounded-lg ${darkMode ? "bg-zinc-500/50" : 'bg-cyan-800/50'} border-none`}>
            <div className="flex flex-row w-96 h-60 items-center justify-evenly m-auto">
              <div className="Icon flex flex-col items-center max-sm:mb-8 w-1/2 max-sm:w-36 max-sm:mt-6 max-sm:h-56 h-56 p-2">
                <img src={handleLogo()} 
                  width={150}
                  height={150}
                  className='max-sm:w-28'
                />
                {data.main ? (
                  <h2 className={`transition-all duration-1000 ease-in-out transform Stats mt-4 text-3xl max-sm:text-md max-sm:mt-10 font-bold font-[Lexend] ${darkMode ? "text-white" : 'text-orange-400'}`}>{data.weather[0].main}</h2>
                ) : null}
              </div>
              <div className="h-60 flex flex-col max-sm:mb-4 justify-center w-1/2 max-sm:w-36 mt-8">
                {data.main ? (
                  <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-6xl text-7xl`}>
                    {MainTemp}℃
                  </h2>
                ) : null}
                <div className="flex flex-col justify-center mt-2">
                {data.main ? (
                  <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-md`}>
                    Feels like {FeelsLike}℃
                  </h2>
                ) : null}
                  {data.main ? (
                    <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-md`}>
                      Humidity {data.main.humidity.toFixed()}%
                    </h2>
                  ) : null}
                  {data.main ? (
                    <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-md`}>
                     Wind Speed {data.wind.speed.toFixed()} m/s
                    </h2>
                  ) : null}
                <div className={`flex flex-row mt-2 justify-around border-t-2 transition-all duration-1000 ease-in-out transform ${darkMode ? "border-white" : 'border-orange-400'} items-center`}>
                  {data.main ? (
                    <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold max-sm:ml-4 mt-1 ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-md`}>
                      High {HighTemp}℃
                    </h2>
                  ) : null}
                  {data.main ? (
                    <h2 className={`transition-all duration-1000 ease-in-out transform Temperature font-bold mt-1 max-sm:ml-4 ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-md`}>
                      Low {LowTemp}℃
                    </h2>
                  ) : null}
                </div>
                </div>
              </div>
          </div>
          </div>
          <div>
              <Apiforecast weatherId={weatherForecast} darkMode={darkMode}/>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
