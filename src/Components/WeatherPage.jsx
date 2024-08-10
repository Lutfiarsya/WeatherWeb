
import { useState, useEffect } from 'react';
import cloudy from '../Assets/cloudy.png'
import rain from '../Assets/rain.png'
import foggy from '../Assets/foggy.png'
import sun from '../Assets/sunny.png'
import thunder from '../Assets/thunder.png'
import {dataCuaca} from '../libs/apicall'
import Apiforecast from './Forecast/Forecast';

const Weather = ({apiSearch}) => {
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

  return (
    <div>
      {data && (
        <>
          <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="location font-bold text-5xl font-[Firasans] text-white">
              {data.name}
            </h1>
          </div>
          <div className='flex flex-row justify-around my-12'>
          <div className="flex w-1/3 h-72 items-center border rounded-lg bg-sky-200/50 border-none">
            <div className="flex flex-row w-96 h-60 items-center justify-evenly m-auto">
              <div className="Icon flex flex-col items-center w-1/2 h-56 p-2">
                <img src={handleLogo()} 
                  width={150}
                  height={150}
                />
                {data.main ? (
                  <h2 className="Stats mt-4 text-3xl font-bold font-[Lexend] text-white">{data.weather[0].main}</h2>
                ) : null}
              </div>
              <div className="h-60 flex flex-col justify-center w-1/2 mt-8">
                {data.main ? (
                  <h2 className="Temperature font-bold text-white text-7xl">
                    {MainTemp}℃
                  </h2>
                ) : null}
                <div className="flex flex-col justify-center mt-2">
                {data.main ? (
                  <h2 className="Temperature font-bold text-white">
                    Feels like {FeelsLike}℃
                  </h2>
                ) : null}
                  {data.main ? (
                    <h2 className="Temperature font-bold text-white">
                      Humidity {data.main.humidity.toFixed()}%
                    </h2>
                  ) : null}
                  {data.main ? (
                    <h2 className="Temperature font-bold text-white">
                     Wind Speed {data.wind.speed.toFixed()} m/s
                    </h2>
                  ) : null}
                <div className="flex flex-row mt-2 justify-around border-t-2 border-white items-center">
                  {data.main ? (
                    <h2 className="Temperature font-bold mt-1 text-white">
                      High {HighTemp}℃
                    </h2>
                  ) : null}
                  {data.main ? (
                    <h2 className="Temperature font-bold mt-1 text-white">
                      Low {LowTemp}℃
                    </h2>
                  ) : null}
                </div>
                </div>
              </div>
            </div>
          </div>
              <div>
                 <Apiforecast weatherId={weatherForecast}/>
              </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Weather;
