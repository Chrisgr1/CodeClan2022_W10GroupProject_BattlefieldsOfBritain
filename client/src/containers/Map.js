import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerPolygon from '../components/MarkerPolygon';
import '../styles/map.css';
import SpecialMarker from '../components/SpecialMarker';

const Map = ({ battlesData, sendNameToDb }) => {

  if(!battlesData) {
    return <div>Loading...</div>
  }

  const battlesNodes = battlesData.map(
    (battle) => ( <MarkerPolygon battle={battle} key={battle._id} sendNameToDb={sendNameToDb}/> )
  );

  const outerBounds = [
    [49.959999905, -7.57216793459],
    [58.6350001085, 1.68153079591],
  ]

  return (
    <>
      
      <MapContainer center={[53, -1]} zoom={6} minZoom={5} maxBounds={outerBounds}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
        { battlesNodes }
        <SpecialMarker/>
      </MapContainer>
  
  </>
 
  );

}

export default Map;



// import { useCallback, useMemo, useState, useEffect } from 'react'
// import {
//   Circle,
//   CircleMarker,
//   MapContainer,
//   Polyline,
//   Polygon,
//   Popup,
//   Rectangle,
//   TileLayer,
//   Marker,
//   useMap
// } from 'react-leaflet';
// import MarkerElement from '../components/MarkerElement';
// import DiscreteSliderMarks from '../components/DiscreteSliderMarks';
// import MapPolygon from '../components/MapPolygon';

// const Map = ({ battlesData, sendNameToDb }) => {

//   console.log("battlesData", battlesData);

  

//   return (
//     <>
//     {battlesData?
//       <MapContainer center={[54.236, -4.54]} zoom={6}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {/* this under maps and displayes the battlefield. I tryed to have it in a different 
//       component, but for some reason it dosent like it */}
//     {  battlesData.map(entity => (
//       <MapPolygon coordinates={entity.geojson.geometry.coordinates[0][0]}/>
      
//     ))
//     } 
//     {/*the code bellow maps and renders the markers, this lives in a different component called MarkerElement  */}
//     {battlesData.map((entity, index) => (
//       <MarkerElement entity={entity} sendNameToDb={sendNameToDb}/>
//     ))}
    
//     </MapContainer>
//     : 
//     <p>loading</p>}
//     {/* <DiscreteSliderMarks  */}
//   {/* changeYearValue={changeYearValue} */}
//   {/* /> */}
  
//   </>
 
//   )
// }

// export default Map