import { useEffect, useState } from "react"
import { forecastApi } from "../../libs/apicall"
import { dataCuaca } from "../../libs/apicall"
import cloudy from '../../Assets/cloudy.png'
import rain from '../../Assets/rain.png'
import foggy from '../../Assets/foggy.png'
import thunder from '../../Assets/thunder.png'
import sun from '../../Assets/sunny.png'



const Apiforecast = ({weatherId}, dailyForecast) => {
    const [dataApi, setDataApi] = useState('')
    const [error, setError] = useState(true)
    const [loading, setLoading] = useState(null)

 const url = forecastApi(weatherId)
 


useEffect(() => {
    const fetchData = async() => {
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error ('Network response was not okay');
            }
            const dataApi = await response.json()
            setDataApi(dataApi)
            setLoading(false)
        }catch{
            setError(error)
            setLoading(false)
        }
    }
    fetchData()
},[weatherId])



//Filter data dari yang harusnya perjam menjadi perhari
{dataApi?.list?.map(() => {
    const index = [7, 15, 23, 31, 39]
    dailyForecast = index.map(i => dataApi.list[i])
})}


//Mengatur hari
const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',  'Friday', 'Sunday']
const day = new Date()

const scheduleFunc = (value) => {
    const today = day.getDay() - 1 
    const indexDay = Days[today + value]
    return indexDay
}
let afterTommorow = scheduleFunc(2)
let dayAfterTomorrow = scheduleFunc(3)
let specificDate = scheduleFunc(4)

const schedule = ['Today', 'Tommorow', afterTommorow , dayAfterTomorrow, specificDate]
const mappingSchedule = schedule.map(item => item)
    return(
        <div className="flex flex-col"> 
            {dataApi && (
                <div className="bg-sky-200/50 w-[800px] rounded-xl h-72 flex">
                    <div className="flex flex-col w-full">
                        <h2>{mappingSchedule}</h2>
                    <div className="flex flex-row justify-around">
                    {dailyForecast.map((items) => {        
                        const weatherIcons = (weather) => {
                            const condition = items.weather[0].main
                            if(condition === "Rain"){
                                weather = rain
                            }else if(condition === 'Clouds'){
                                weather = cloudy
                            }else if(condition === 'Clear'){
                                weather = sun
                            }
                            return weather
                        }                        
                        const farenheit = items.main?.temp.toFixed()
                        const celcius = Math.round(5/9 * (farenheit - 32))
                            return(
                                <div className="flex flex-col"> 
                                <img 
                                    src={weatherIcons()}
                                    height={50}
                                    width={50}
                                    
                                    />
                                <h2 className="text-white mt-2">{celcius}℃</h2>                     
                            </div>
                        )
                    
                    })}
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Apiforecast