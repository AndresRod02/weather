import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BoxIconElement } from 'boxicons';
import Swal from 'sweetalert2'
import Load from './load';
const Weather = () => {
    const [latitude, setLatitude] = useState(34)
    const [longitude, setLongitude] = useState(-118)
    const [openWeather, setOpenWeather] = useState({})
    const [farenheit, setFarenheit] = useState(true)
    const [city, setCity] = useState('Bogota')
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(false)
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
     const ArrayIcon = {
      "01d": '/1.svg',
      "01n": '/10.svg',
      "02d": '/2.svg',
      "02n": '/11.svg',
      "03d": '/3.svg',
      "03n": '/3.svg',
      "04d": '/4.svg',
      "04n": '/4.svg',
      "09d": '/5.svg',
      "09n": '/5.svg',
      "10d": '/6.svg',
      "10n": '/6.svg',
      "11d": '/7.svg',
      "11n": '/7.svg',
      "13d": '/8.svg',
      "13n": '/8.svg',
      "50d": '/9.svg',
      "50n": '/9.svg'
     }
    return (
        <div>
          {isLoading && <Load></Load>}
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
          <img src={ArrayIcon[openWeather.weather?.[0].icon]} className='img'/> 
        </div>
      );
    };

export default Weather;