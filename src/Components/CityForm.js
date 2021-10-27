import React, {useState} from 'react';

const CityForm = ({initCity}) =>{
    const [cityChange, setCityChange] = useState("Nairobi");

    const handleChange = (e) =>{
        setCityChange(e.target.value);
        
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        initCity(cityChange)
        //console.log("https://https://api.ipgeolocation.io/timezone?apiKey=" + api_keys.ipgeolocation + "&location="+ city);
        setCityChange("");
    }
    return(
        <form className="location-search-cont" onSubmit={handleSubmit}>
            <input type="text" className="location-search" placeholder="Enter city" onChange={handleChange} value={cityChange}/>
            <button type="submit" className="location-submit"><i className="fas fa-search"></i></button>
        </form>
        )
}
export default CityForm;