import { useEffect, useState } from "react"
import { forecastApi } from "../../libs/apicall"
import { dataCuaca } from "../../libs/apicall"
import cloudy from '../../Assets/cloudy.png'
import rain from '../../Assets/rain.png'
import foggy from '../../Assets/foggy.png'
import thunder from '../../Assets/thunder.png'
import sun from '../../Assets/sunny.png'



const Apiforecast = ({weatherId, darkMode}, dailyForecast) => {
    const [dataApi, setDataApi] = useState('')
    const [error, setError] = useState(true)
    const [loading, setLoading] = useState(null)

 const url = dataCuaca(`forecast?id=${weatherId}`)
 


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
const Days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const day = new Date()

const scheduleFunc = (value) => {
    const today = day.getDay()
    const index = today + value
    const indexDay = index > 6 ? Days[index - 7] : Days[index]
    return indexDay
}
let afterTommorow = scheduleFunc(2)
let dayAfterTomorrow = scheduleFunc(3)
let specificDate = scheduleFunc(4)

const schedule = ['Today', 'Tommorow', afterTommorow , dayAfterTomorrow, specificDate]
const mappingSchedule = schedule.map(item => item)


//Mengatur tanggal
const [dates, setDates] = useState([])
useEffect(() => {
    const date = []

    let currentDate = new Date()
    for(let i = 0; i < 6; i++){
        const formatDate = currentDate.toLocaleDateString('id-ID')
        date.push(formatDate)
        currentDate.setDate(currentDate.getDate() + 1)
    }
    setDates(date)
},[])



    return(
        <div className="flex"> 
            {dataApi && (
                <div className={`transition-all duration-500 ease-in-out transform ${darkMode ? "bg-zinc-500/50" : 'bg-cyan-800/50'} w-[800px] rounded-xl h-72 max-sm:h-64 flex flex-row max-sm:flex-col max-sm:overflow-y-auto max-sm:mb-4 max-sm:w-[360px] max-sm:m-auto justify-around`}>
                            {dailyForecast.map((items, index) => {        
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
                        const farenheit = [items.main?.temp.toFixed(), items.main.feels_like.toFixed() ]
                        const MainTemp = Math.round(5/9 * (farenheit[0] - 32))
                        const feelsLike = Math.round(5/9 * (farenheit[1] - 32))
                            return(
                                <div className="flex flex-col max-sm:flex-row md items-center mt-2"> 
                                { /**  untuk menampilkan hasil dari mapping sebuah hari */}
                                <h2 className={`transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'} font-bold text-lg max-sm:text-xs`}>{mappingSchedule[index]}</h2>
                                <h2 className={`transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'} text-xs max-sm:text-[8px]`}>{dates[index]}</h2>
                                <img 
                                    src={weatherIcons()}
                                    height={50}
                                    width={50}
                                    className="mt-2 max-sm:w-10"
                                    />
                                <h2 className={`transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'} mt-2 max-sm:text-xs text-sm`}>{MainTemp}℃</h2>
                                <div className="mt-20 flex max-sm:mt-24 flex-col items-center">
                                    <h2 className={`transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-xs text-sm`}>{feelsLike}℃</h2>
                                    <h2 className={`mt-2 transition-all duration-1000 ease-in-out transform ${darkMode ? "text-white" : 'text-orange-400'} max-sm:text-xs text-sm`}>{items.wind.speed} m/s</h2>
                                </div>                    
                            </div>
                        )
                    
                    })}
                </div>
            )}
        </div>
    )
}

export default Apiforecast