import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './Weathercard';

export default function Temp() {

const [data,setdata]=useState("pune");
const [tempinfo,settempinfo]=useState({});

const getweather= async ()=>{
   
    try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=c487d91e2b0a369ab03622d5f5e16326`;
        
        const res= await fetch(url);
        const fdata=  await res.json();
        
        const{temp,humidity,pressure}=fdata.main;
        const {main:weathermood}=fdata.weather[0];
        const {name}=fdata;
        const {speed}=fdata.wind;
        const {country,sunset}=fdata.sys; 

        const mynewweatherinfo={
             temp,humidity,pressure,weathermood,name,speed,country,sunset, 
        };
        settempinfo(mynewweatherinfo);

    } catch (error) {
        console.log(error);
    }
 }
   
 useEffect(()=>{
    getweather();
 },[])
 


 const change=(event)=>{
     setdata(event.target.value);
 }

  return (
            <>
             <div className="wrap">
                 <div className="search">
                     <input type="search" value={data} onChange={change} placeholder='search....' autoFocus id="search" className='searchTerm'/>
                     <button className="searchButton" type='button' onClick={getweather}>Search</button>
                     </div>
                </div>     
                  <Weathercard tempinfo={tempinfo} />
                               
            </>

       )
}
