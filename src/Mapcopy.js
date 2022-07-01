import React, {useEffect, useReducer, useState,useRef} from 'react';
import './Mapcopy.css';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import LineRender from './LineRender'
import {useNavigate} from "react-router-dom"
const API = '***********************'
const axios = require('axios');

function Map1() {
  
  // states
  const [lineData,getlineData] = useState('')
  const [threshold,setThreshold] = useState('0.5')
  const [showUpdate,setShow] = useState(false)
  const [showClickDiv, setClickDiv] = useState(true)
  const [showAdd, setshowAdd] = useState(true)
  const [showAddField, setshowAddField] = useState(false)
  const [geometryString,setgeometryString] = useState('')
  const [wearString,setwearString] = useState('')
  const [weatherString,setweatherString] = useState('')
  const [vegString,setvegString] = useState('')

  // getting line data from API
  const getalllineData = () => {
    axios.get(API)
    .then((response) => {
      const allLines = response.data
      getlineData(allLines)
      console.log(response)
    })
  }

  useEffect(() => {
    getalllineData();
  }, []);


  // threshold setting change
  const handleChange = event => {
    if(event.target.value < 0 || event.target.value > 1){
      alert("Please input valid threshold.")
      event.target.value = 0.5
    }
    else{ 
      setThreshold(event.target.value)
    }
  }

  // hiding an element
  const clickShow = event => {
    setShow(true)
    setClickDiv(false)
  }

  // LOGOUT METHOD
  const navigate = useNavigate()
  const logOut = () =>
    {
      return(
        navigate("/")
    )      
    }
  
  // unhiding element
  const handleAddClick = () => {
    setshowAdd(false)
    setshowAddField(true)
  }

  //adding geometry to geometry field
  const geometryAdd = (event) => {
    var obj = JSON.parse(event.target.value)
    console.log(event.target.value)
    setgeometryString(obj)
  }
  // adding wear
  const wearAdd = (event) => {
    setwearString(event.target.value)
  }
  //adding weather
  const weatherAdd = (event) => {
    setweatherString(event.target.value)
  }
  // adding vegetation
  const vegAdd = (event) => {
    setvegString(event.target.value)
  }
  // adding name
  const nameAdd = (event) => {
    
  }
  let headers = {
    xsrfHeaderName: "X-CSRFToken",
  }
  // adding new line from inputs given by sending to API
  const addToMap = () => {
    setshowAddField(false)
    setshowAdd(true)
    axios.post(API, {
      geometry: geometryString,
      wear: wearString,
      weather: weatherString,
      vegetation : vegString,
    },{headers}
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      alert("Please make sure fields are valid.")
      console.log(error);
    });
    setgeometryString('')
    setwearString('')
    setweatherString('')
    setvegString('')
  }
    
  return ( 
    
    <div className="background" > 
     
      <header className = "header1">
        <div className = "logout" onClick={logOut}>
            Log Out
        </div>
      </header>

    
    <div className="map">
    
    <div>
      {showClickDiv && (<div className="thresholdButton" onClick={clickShow}>Update Threshold</div>)}
      {showUpdate && (<form >
            <input type="text" placeholder='Threshold' name="Threshold" onChange={handleChange} className="thresInput"></input>
      </form>)}
      {showClickDiv && (<h3>Current Threshold: {threshold}</h3>)}


      

    <MapContainer  className = 'map' center={[38.5, -121.7]} zoom={9} scrollWheelZoom={true}>

      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LineRender lines={lineData} thres={threshold}></LineRender>
    </MapContainer>
    </div>
    {showAdd && (<div className="addLine" onClick={handleAddClick}>Add Line</div>)}
      {showAddField && (<form className='formbox' >
      
        <input type = "text" placeholder="Geometry" className="addInput" onChange={geometryAdd}></input>
          <input type = "text" placeholder="Wear" className="addInput"  onChange={wearAdd}></input>
          <input type = "text" placeholder="Weather" className="addInput"  onChange={weatherAdd}></input>
          <input type = "text" placeholder="Vegetation" className="addInput"  onChange={vegAdd}></input>
          <input type = "text" placeholder="Name" className="addInput"  onChange={nameAdd}></input>
        <label>
          <input type = "submit" className="addInput"  onClick={addToMap}></input>
        </label>
      </form>
      )}
    </div>
    
    </div>
  );
}

export default Map1;