import './App.css';
import React, { useEffect, useRef, useState } from "react";
import headerBgImg from './img/pattern-bg.png'
import iconArrow from './img/icon-arrow.svg'
import iconLocation from './img/icon-location.svg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const [ip, setIp] = useState('')
  const [dataRes, setData] = useState({
    ip: '192.212.174.101',
    location: 'Brooklyn, NY',
    timezone: 'UTC -05:00',
    isp: 'SpaceX Starlink',
    lat: 51.505,
    lng: -0.09
  })

  const MemorizedMap = React.memo(({lat, lng}) => {
    console.log(lat, lng)
    return (
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>{iconLocation}</Marker>
      </MapContainer>
    );
  })

  const handleSubmit = e => {
    e.preventDefault();
    if (!ip) return;
    let url = `https://geo.ipify.org/api/v1?apiKey=at_6Vj9JOXJ99sZEhAUBIt42Gx2gM3v7&ipAddress=${ip}`
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('data', data)
        setData({
          ip: data.ip,
          location: data.location.city + ',' + data.location.region,
          timezone: data.location.timezone,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div>
      <header className="App-header">
        <img src={headerBgImg} className="header-bg-img" alt="header background" />
        <div className="header-content">
          <h1>IP Address Tracker</h1>
          <form onSubmit={handleSubmit}>
            <input value={ip} onChange={e => setIp(e.target.value)}></input>
            <button><img src={iconArrow} alt="search submit"/></button>
          </form>
        </div>
      </header>
      <div className="main">
        <div className="result">
          <ul>
            <li>
              <h4>IP ADDRESS</h4>
              <div className="res-text">{dataRes.ip}</div>
            </li>
            <li>
              <h4>LOCATION</h4>
              <div className="res-text">{dataRes.location}</div>
            </li>
            <li>
              <h4>TIMEZONE</h4>
              <div className="res-text">{dataRes.timezone}</div>
            </li>
            <li>
              <h4>IPS</h4>
              <div className="res-text">{dataRes.isp}</div>
            </li>
          </ul>
        </div>
        <MemorizedMap lat={dataRes.lat} lng={dataRes.lng} />
      </div>
    </div>
  );
}

export default App;
