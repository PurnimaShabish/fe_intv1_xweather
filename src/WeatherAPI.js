import React ,{useState} from "react";
import "./WeatherAPI.css";
import axios from "axios";

export default function WeatherAPI(){
    const [cityName, setCityName] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [apiData,setApiData] = useState({});
    // const [cityFlag, setCityFlag] = useState(true);


    //test
    // const Data = {Temperature:"27.4 C", Humidity:"30%", Condition:"Sunny", WindSpeed : "13.7 kph"}

    const apiURL = "https://api.weatherapi.com/v1/current.json";
    const myAPIKey = "6051a663b55040f38b7123624250302";

    const handleSearch = async () => {
        setApiData({});
        try{
            setIsLoading(true);
            const response = await axios.get(apiURL,{
                            params:{
                                key:myAPIKey,
                                q:cityName
                            }
            });

            const { temp_c, humidity, wind_kph, condition } = response.data.current;
            setApiData({ temp_c, humidity, wind_kph, condition });
        }
        catch(error){
            console.error('Error fetching data:', error);
            alert("Failed to fetch weather data")
        }
        finally{
            setIsLoading(false);
        }
    }


    // <div className="weather-fragment">
    // <h4 style={{marginBottom:"-10px",fontFamily:"Robot"}}>{name}</h4>
    // <p>{data} {unit}</p>
    // </div>

    const weatherCard = (name,data,unit) => {
        return(
            <>
                <h4 style={{marginBottom:"-10px",fontFamily:"Robot"}}>{name}</h4>
                <p>{data} {unit}</p>
            </>
        );
    }

    return(
        <div className="container">
            <input style={{backgroundColor:"white"}}
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    onChange={(e)=>setCityName(e.target.value)}>
            </input> 

            <button onClick={handleSearch}>Search</button>

            {isLoading?(<p style={{color:"grey", fontFamily:"Robot"}}>Loading Data...</p>) 
            :
            (apiData?
                (<div className="weather-cards">
                    <div className="weather-card">
                        {weatherCard("Temperature",apiData.temp_c,"°C")}
                    </div>
                    <div className="weather-card">
                        {weatherCard("Humidity", apiData.humidity,"%")}
                    </div>
                    <div className="weather-card">
                        {weatherCard("Condition", apiData.condition?.text,"")}
                    </div>
                    <div className="weather-card">
                        {weatherCard("Wind Speed", apiData.wind_kph,"kph")}
                    </div>
                </div>)
                : "")}
        </div>
    );

}