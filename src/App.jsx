import { useState, useEffect } from 'react';
import locationPng from './location-pin.png';
import rainBackground from "./rain-background.gif"
import cloudsBackground from "./clouds-background.gif"
import thunderBackground from "./thunder-background.gif"
import snowBackground from "./snow-background.gif"
import clearSky from "./clear-sky.jpg"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data.weather && data.weather.length > 0) {
      const weatherCondition = data.weather[0].main;

      if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle') {
        document.body.style.backgroundImage = `url('${rainBackground}')`;
        document.body.style.backgroundSize = 'cover';
      } else if (weatherCondition === "Clouds" ) {
        document.body.style.backgroundImage = `url('${cloudsBackground}')`;
      } else if (weatherCondition === "Clear") {
        document.body.style.backgroundImage = `url('${clearSky}')`;
      } else if (weatherCondition === "Thunder") {
        document.body.style.backgroundImage = `url('${thunderBackground}')`;
      }
    }
  }, [data.weather]);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=37b6d43ff7bc9c55e1a7c20cb8578395&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        console.log(result)
        setSearched(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setLocation('');
      }
    }
  };

  return (
    <>
      <div className="flex">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder=" Enter city..."
        />
        {searched && (
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="all-temp">
                <div className="temp">
                  {data.main ? (
                    <div>
                      {Math.round(data.main.temp)}
                      °
                    </div>
                  ) : null}
                </div>

                <div className="min-max">
                  <div className="temp-min">
                    {data.main ? (
                      <div>
                        {Math.round(data.main.temp_min)}
                        °
                      </div>
                    ) : null}
                  </div>
                  <div>/</div>
                  <div className="temp-max">
                    {data.main ? (
                      <div>
                        {Math.round(data.main.temp_max)}
                        °
                      </div>
                    ) : null}
                  </div>
                </div>

   

                <div className="city">
                  <h1>{data.name}</h1>
                  <div>
                    <img className="location-png" src={locationPng} alt="Location Pin" />
                  </div>
                </div>
                {data.weather ? 
                  <div>{data.weather[0].description}</div>
                : null}

                <div className="other">
                  <div className="feels-like">
                    {data.main ? (
                      <div>{Math.round(data.main.feels_like)}°</div>
                    ) : null}
                    <div>Feels Like</div>
                  </div>
                  <div className="humidity">
                    {data.main ? (
                      <div>{data.main.humidity}%</div>
                    ) : null}
                    <div>Humidity</div>
                  </div>
                  <div className="wind">
                    {data.wind ? (
                      <div>{Math.round(data.wind.speed)} km/h</div>
                    ) : null}
                    <div>Wind Speed</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default App;
