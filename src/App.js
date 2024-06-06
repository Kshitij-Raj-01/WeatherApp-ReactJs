import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const API_KEY = '3fdc2ad662750b397f7f1a1d94c5197e';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd + '/' + mm + '/' + yyyy + '  ' + h + ':' + m + ":" + s;

  async function fetchData() {
    let response = await fetch(url);
    let output = await response.json();
    if (response.ok) {
      localStorage.setItem('savedweather', JSON.stringify(output));
      setData(output);
    }
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  }

  useEffect(() => {
    let savedWeather = JSON.parse(localStorage.getItem('savedweather'));
    if (savedWeather) {
      setData(savedWeather);
    }
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder='Search City'
          type="text" />
      </div>
      <div className='container'>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather" /> : null}
            {data.main ? <h1>{(data.main.temp - 273).toFixed()}&deg;C</h1> : null}
            <p>{completedOn}</p>
            {data.main ? <p>Longitude: {data.coord.lon}</p> : null}
            {data.main ? <p>Latitude: {data.coord.lat}</p> : null}
          </div>
          <div className="description">
            {data.main ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{(data.main.feels_like - 273).toFixed()}&deg;C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.main ? <p className='bold'>{(data.wind.speed).toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>Made By Kshitij Raj</p>
            <p>BTech Department Shobhit University Meerut</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
