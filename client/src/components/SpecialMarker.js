import { Popup, Marker, LayersControl } from 'react-leaflet';
import { Icon } from 'leaflet';

function SpecialMarker() {

    const icon = new Icon({
            iconUrl: "/heart.svg",
            iconSize: [25, 25]
          });

    return ( 
        <LayersControl position="topright">
        <LayersControl.Overlay name="Acknowledgements">
        <Marker 
        eventHandlers = {{
          mouseover: (e) => {
            e.target.openPopup();
          },
          mouseout: (e) => {
              e.target.closePopup();
          }
        }}
        icon = {icon}
        position = {[54.93, -0.24]}
      >
            <Popup>
                <h3>With thanks to the instructor team</h3>
                <img className='special-marker' src='/heart.svg' width='5%' height='5%'></img>
                <p>Anna<br/>
                Jarrod<br/>
                John<br/>
                Sky<br/>
                Zsolt</p>
                <h4>You guys are the best</h4>
            </Popup>
            </Marker>
        </LayersControl.Overlay>
        </LayersControl>

     );
}

export default SpecialMarker;