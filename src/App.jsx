import { useState } from 'react'
import locationPng from "./location-pin.png"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=37b6d43ff7bc9c55e1a7c20cb8578395&units=metric`

  const searchLocation = async (event) => {
    if (event.key === 'Enter'){
      try {
        const response = await(fetch)(url);
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        console.log(result);
        setLocation("")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  } 
  
}

  return (
    <>
      <div className='flex'>
        <input 
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyPress={searchLocation}
        type="text" 
        placeholder=' Enter city...'
        />
        <div className='all-temp'>
          <div className="temp">
            {data.main ? 
              <div>
                {Math.round(data.main.temp)}
                °
              </div> 
            : null}
          </div>
          
          <div className='min-max'>
            <div className="temp-min">
              {data.main ? 
                <div>
                {Math.round(data.main.temp_min)}
                °
                </div> 
              : null}
            </div>
            <div>/</div>
            <div className="temp-max">
            {data.main ? 
            <div>
              {Math.round(data.main.temp_max)}
              °
            </div> 
            : null}
            </div>
          </div>
        </div>
        
          
        <div className='city'>
          <h1>{data.name}</h1>
          <div>
            <img className='location-png' src={locationPng} alt="Location Pin" />
          </div>
        </div>
        
        <div className='other'>
          <div className='feels-like'>
            {data.main ? 
              <div>{Math.round(data.main.feels_like)}°</div>
            : null}
            <div>Feels Like</div>
          </div>
          <div className='humidity'>
            {data.main ?
            <div>{data.main.humidity}%</div>
            : null}
            <div>Humidity</div>
          </div>
          <div className='wind'>
            {data.wind ? 
              <div>{Math.round(data.wind.speed)} km/h</div>
            : null}
            <div>Wind Speed</div>
          </div>
        </div>
      </div>
    
      <div className='overlay'></div>
    </>
  )
}

export default App
