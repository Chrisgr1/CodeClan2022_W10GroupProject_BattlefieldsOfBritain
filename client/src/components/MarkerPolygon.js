import { Popup, Marker, Polygon, useMap, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useState } from 'react';

function stringToColor(str) {
  for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
  for (var j = 0, hex = "#"; j < 3; hex += ("00" + ((hash >> j++ * 8) & 0xFF).toString(16)).slice(-2));
  return hex;
}

const MarkerPolygon = ({ battle, sendNameToDb }) => {

  const [zoomResetButtonToggle, setZoomResetButtonToggle] = useState('zoom-reset-button-hidden');

//   const [animateMarkerToggle, setAnimateMarkerToggle] = useState('')

  const uniqueRandomColor = stringToColor(battle.name);

  const markerHtmlStyles = `
  background-image: url('/310788.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5em 2.5em;
  background-color: ${uniqueRandomColor};
  width: 2rem;
  height: 2rem;
  display: block;
  position: absolute;
  border-radius: 50% 50% 50% 50% / 12% 12% 88% 88%;
  border: 1px solid #FFFFFF;`

  const icon = divIcon({
    // className: animateMarkerToggle,
    className: 'custom-markers',
    html: `<span style="${markerHtmlStyles}" />`
  })

  const handleOnClick = () => {
    map.setView([54.236, -4.54], 6);
    setZoomResetButtonToggle('zoom-reset-button-hidden');
  }
    
  const map = useMap();
    
  return (

    <div>

      <Marker 
        eventHandlers = {{
          click: (e) => {
            sendNameToDb(battle.name)
            map.setView(battle.geojson.geometry.coordinates[0][0][0], 13);
            e.target.openPopup();
            setZoomResetButtonToggle('zoom-reset-button');
          },
          mouseover: (e) => {
            e.target.openPopup();
            // setAnimateMarkerToggle('custom-markers');
          },
          mouseout: (e) => {
            if (map.getZoom() < 13) {
              e.target.closePopup();
              setZoomResetButtonToggle('zoom-reset-button-hidden');
            //   setAnimateMarkerToggle('');
            }
          }
        }}
        icon = {icon}
        position = {battle.geojson.geometry.coordinates[0][0][0]}
      >

        <Popup>
          <p id='battle-name'>{battle.name}</p>
          <button id={zoomResetButtonToggle} onClick={handleOnClick}>Reset Zoom</button>
        </Popup>

      </Marker>

      <Polygon
        className = 'polygons'
        eventHandlers =  {{
          click: () => {
            window.open(battle.json['documentation-url']);
          }
        }}
        pathOptions = {{color: uniqueRandomColor, fillOpacity: 0.5}}
        positions = {battle.geojson.geometry.coordinates[0][0]}
      >

        <Tooltip>Click here to visit Historic England</Tooltip>

      </Polygon>

    </div>

  );

}

export default MarkerPolygon