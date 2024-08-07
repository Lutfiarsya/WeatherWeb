import Weather from "../../Components/WeatherPage";
import { dataCuaca } from "../../libs/apicall";

const page = ({params}) => {
    const {keyword} = params
    const decodedKeyword = decodeURI(keyword);


    const url = dataCuaca(decodedKeyword)


    return(
        <div>
             <Weather api={url}/>
        </div>
    )
}


export default page