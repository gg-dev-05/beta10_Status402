import React from 'react';
import './WeatherPrediction.css';

function WeatherPrediction(){
    return(
        <div className="WeatherSection"> {/* To implement CSS */}
            <img className="WeatherImage" src="#" /> {/* Image based on the weather condition */}
            <p className="WeatherForecast">Rain With Thunderstorms</p> {/* dynamically change weather data */}
        </div>
    )
}

export default WeatherPrediction;