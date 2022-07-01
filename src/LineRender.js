import React from 'react'
import { GeoJSON } from 'react-leaflet'

// assigns color of line based on risk and threshold setting
const decideColor = (risk,threshold) => {
    var color = ''
    if(threshold >= risk){
        color = 'green'
    }
    else{
        color = 'red'
    }
    
    return color
}

// component to render lines onto map using map function
export default function LineRender (props){
// function that returns all GeoJSON objects from data
const displayGeo = (props) => {
    const {lines} = props // props received from MapCopy.js
    const {thres} = props // props received from MapCopy.js

    console.log(thres)
    if(lines.length > 0){
        return(
            lines.map((line,index) => {
                return(
                    <GeoJSON data={line.geometry} pathOptions= {{ color: decideColor(line.wear*line.vegetation*line.weather,thres)}}></GeoJSON>
                )
            })
        )
    } else{
        return(<div></div>)
    }
}
    return ( // all the rendered lines
        <> 
        {displayGeo(props)}
        </>
    )
}