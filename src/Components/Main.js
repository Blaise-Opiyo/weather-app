import {useState, useEffect, useCallback} from 'react';
import '../Styles/Main.css';
import CityForm from './CityForm';
import animated_snow from '../Assets/animated_snow.gif';
import city_architecture_buildings from '../Assets/city_architecture_buildings.jpg';


const Main = () =>{
    
    const [city, setCity] = useState("Nairobi");
    const [location, setLocation] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherfeel, setWeatherfeel] = useState(null);
    const [time, setTime] = useState(null)

    useEffect(()=>{
        fetchTimezone();
        fetchWeather();
        fetchPhoto();
      console.log("rendered");
      console.log(city);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city]);     
   
    
    const api_keys ={
        ipgeolocation:"a6cf6d9624eb4984a09f3fc02060b2fb",
        openweathermap:"ed42c665914c624bcb0fa1f8959b3628",
        unsplash:'wsV2IO87JYQyvHkRRIQXspjXzMUrTA6_d8kKeyf42MI'
    }
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ city + "&appid=" + api_keys.openweathermap;
    const locationUrl = "https://api.ipgeolocation.io/timezone?apiKey=" + api_keys.ipgeolocation + "&location="+ city;
    const photoUrl = "https://api.unsplash.com/search/photos?client_id=" + api_keys.unsplash + "&page=1&query=" + city + "&per_page=2";

    const fetchTimezone = () =>{
        
            fetch(locationUrl).then(res =>{
                return res.json();
            }).then(resJson =>{
                console.log("Success");
                setLocation(resJson.geo);
                setTime((resJson.date_time_txt).split(" "));
                console.log(time);
            }).catch(err=>{
                console.log(err);
            })
    }
    const fetchWeather = () =>{
        fetch(weatherUrl).then(res =>{
            return res.json();
        }).then(resJson =>{
            console.log("Success");
            setWeather(resJson.weather);
            setWeatherfeel(resJson.main);
            console.log(weather);
            console.log(weatherfeel);
        }).catch(err=>{
            console.log(err);
        }
        )
    }  
    const fetchPhoto = () =>{
        fetch(photoUrl)
            .then(res =>{
                return res.json()
            })
            .then(data =>{
                console.log(data.results[1].urls.regular);
                setPhoto(data.results[1].urls.regular);
            })
            .catch(err =>{
                console.log(err);
            })
    }
    
    const initCity = (city) =>{
        setCity(city);
    }

    const todayStyle = {
        fontSize: "40px",
        fontWeight: "bolder",
        textAlign: "start",
        margin: 0
    }
    
    return(
        (weather === null || weatherfeel === null || time === null || location === null  || photo === null) ? (
            <div style={{color:"#000000"}}>Fetching...</div>
        ):(
            <div className="Geo-cont "> 
                <div className="location ">
                    <img src={photo} alt="city_architecture_buildings.jpg" />
                    <div className="top-location-details">
                        <p className="the-weather">The Weather</p>
                        <div className="top-location">
                            <div><i className="fas fa-map-marker-alt"></i></div>
                            <div>
                                <p style={{fontWeight: "lighter"}}>Current location</p>
                                <p style={{fontWeight: "bolder"}}>{location.state}, {location.country}</p>
                            </div>
                        </div>
                        <div>
                            {/* city form */}
                            <CityForm initCity={initCity}/>
                        </div>
                    </div>
                    <div className="bottom-location-details">
                        
                        <div className="upper-bottom-location-details">
                            <div style={{fontSize: "20px"}}>Sunny</div>
                        </div>
                        <div className=" lower-bottom-location-details">
                            <div className="temp">
                                {Math.round(weatherfeel.temp)}<span><sup>o</sup></span>
                            </div>                    
                            <div className="date-place">
                                { <p>{time[0]} {time[2]} {time[1]}</p> }
                                {/*<p>Monday, 21 September</p>*/}
                            <p><i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i>{location.state}</p>
                            </div>                    
                            <div className="gif-depict">
                                <img src={animated_snow} alt="animated_snow.gif"/> 
                            </div>
                        </div>                 
    
                    </div>
                </div>
                
                <div className="weather">
                    {/*
                    <form className="wearther-search-form" onSubmit={handleSubmit}>
                        <input type="text" className="city-search" placeholder="Enter city" onChange={handleChange} value={cityChange}/>
                        <button type="submit" className="city-submit"  ><i className="fas fa-search"></i></button>
                    </form>
                    */}
                    <p style={todayStyle}>Today</p>
                        <div className="weather-cont">
                            <div className="main-weather">  
                                <p className="weather-temp"><span >{Math.round(weatherfeel.temp)}</span><span><sup>o</sup></span></p>
                                <p className="weather-overall" >Sunny <img src={animated_snow} width="50px" height="50px" alt="current weather"/></p>
                                { <p>{time[0]} {time[2]} {time[1]}</p> }
                                {/* <p>Monday 27, July 20</p> */}
                            </div>    
                            <div className="weather-details">
                                <div>
                                    <p>RealFeel:</p>
                                    <p>Humidity:</p>
                                    <p>Pressure:</p>
                                    <p>Temp:</p>
                                    <p>Temp_max:</p>
                                    <p>Temp_min:</p>
                                </div>
                                <div>
                                    <p>{weatherfeel.feels_like}</p>
                                    <p>{weatherfeel.humidity}</p>
                                    <p>{weatherfeel.pressure}</p>
                                    <p>{weatherfeel.temp}</p>
                                    <p>{weatherfeel.temp_max}</p>
                                    <p>{weatherfeel.temp_min}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    
    )
}
export default Main;