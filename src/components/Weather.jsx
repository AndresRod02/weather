import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Weather = () => {
    const [latitude, setLatitude] = useState(34)
    const [longitude, setLongitude] = useState(-118)
    const [openWeather, setOpenWeather] = useState({})
    const [farenheit, setFarenheit] = useState(true)
    const [city, setCity] = useState('Bogota')
    const iconCode = openWeather.weather?.[0].icon;
    const iconUrl = iconCode ? `http://openweathermap.org/img/w/${iconCode}.png`: ''
    //Busqueda
    const change = (event) =>{
     setCity(event.target.value)
 }
    useEffect(()=>{
     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f2f11a0a655ce45b92f075f66dc6510`)
         .then((result)=>{
           setOpenWeather(result.data)
         })
         .catch((error)=>console.error(error, "Falló"))
    }, [city])
    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])
     useEffect(()=>{
         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9f2f11a0a655ce45b92f075f66dc6510`)
         .then((result)=>{
            setOpenWeather(result.data)
         })
         .catch((error)=> console.error(error))
     }, [latitude, longitude])
     const update = ()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
     }
     return (
        <div>
          {openWeather.main && (
            <div className='card'>
              <h1>{farenheit ? Math.floor(openWeather.main.temp-273.15) :Math.floor((openWeather.main.temp-273.15)*9/5 + 32) }{farenheit ? "°C" : "°F"}</h1>
              <h3>WIND <span>{openWeather.wind.speed} m/s</span></h3>
              <h3>CLOUDS <span>{openWeather.clouds.all}%</span></h3>
              <h3>PRESSURE <span>{openWeather.main.pressure} hPa</span></h3>
              <h3>HUMIDITY <span>{openWeather.main.humidity}%</span></h3>
              <h2>{openWeather.name}, {openWeather.sys.country}</h2>
              <h3 className='description'>{openWeather.weather[0].description.toUpperCase()}</h3>
              <button onClick={()=>{setFarenheit(!farenheit)}} className='btn'>Cambiar a F°</button>
              <button onClick={update} className='map'><box-icon type='solid' name='map'></box-icon></button>
            </div>
          )}
          <input type="text" onChange={change} className='query' placeholder={'  Busca una ciudad'}/>
          <img src={iconUrl} alt="" className='img'/> 
        </div>
      );
    };

export default Weather;