import React, { useState, useEffect, useContext } from 'react'
import DiscreteSliderMarks from './components/DiscreteSliderMarks';
import Map from './containers/Map';
import BattlesDataContext from './context/battlesDataContext';
import {reverseCoordinates} from './helpers/reverseCoordinates';

import './App.css';


function App() {
  // all data gotten from DB
  const [battlesData, setBattlesData] = useState(null);
  // all data gotten from wikiApi
  const [dataGottenFromWiki, setDataGottenFromWiki] = useState(null);
  // where only the title from wiki Api is stored 
  const [battleTitle, setBattleTitle] = useState(null);
  // the hard coded info gotten from the Db
  const [battleInfoDb, setBattleInfoDb] = useState(null);
  // the hardcoded image gotten from the Db
  const [battleImgDb, setBattleImgDb] = useState(null);
  // this (bellow) is being gotten as should from the api call on the server side 
  // but it needs sanitisation. 
  // Right now the actual battle info is hardcoded on the DB
  const [battleDescriptionWiki, setBattleDescriptionWiki] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // bellow is the state that stored the filtered battle to be displayed.
  const [filteredBattles, setFilteredBattles] = useState(null);
  // to be used for getting input from the timeline bar
  const [filterRange, setFilterRange] = useState([900, 1700]);


  useEffect(() => {
    fetch("http://localhost:5050/api/battles")
    .then(res => res.json())
    .then(res => {
      // the function bellow is reversing each individual coordination array 
      // without touching the rest of the object. If a simple map is used 
      // each of the rest of the object's properties are deleted and substituted
      // with this.
      const battlesReversed = res.map( battle => {
        return { 
          ...battle,
          geojson: { 
            ...battle.geojson,
            geometry: {
              ...battle.geojson.geometry,
              coordinates: 
              reverseCoordinates(battle.geojson.geometry.coordinates)
            }
           }
        }
      });
      setBattlesData(battlesReversed);
      setFilteredBattles(battlesReversed);
      setIsLoaded(true);
    })
    
  }, []);

  // when we have the data, we set the title
  // in a different version that I am going to try to update
  // here we also save the un sanitised info
  useEffect(() => {
    if(dataGottenFromWiki){
      setBattleTitle(dataGottenFromWiki.title);
    }
    
  }, [dataGottenFromWiki]);

// Timeline Bar control =========
  const changeYearValues = (values) => {
    setFilterRange(values);
  }

  const getYearOfBattle = (battlefield) => {
    const date = battlefield.name.split(' ').pop();
    return parseInt(date)
  }

  function betweenRange(x, min, max) {
    return x >= min && x <= max;
  }

  useEffect(() => {
    if(!isLoaded){
      return
    }
    const filteredBattlesData = battlesData.filter(
      (battlefield) => { 
        if (filterRange[0] <= filterRange[1]) {
          if ( betweenRange( getYearOfBattle(battlefield), filterRange[0], filterRange[1] ) ) {
            return battlefield;
          }
        }
        if (filterRange[0] > filterRange[1]) {
          if ( betweenRange( getYearOfBattle(battlefield), filterRange[1], filterRange[0] ) ) {
            return battlefield;
          }
        }
      }
    );
    setFilteredBattles(filteredBattlesData);
    
  }, [filterRange]);

  //============================
 

  const stringParser = (string) => {
    const stringArray = string.split(' ')
        stringArray.pop()
        
        return stringArray.join(' ')
    }

  // when the request to the server side for the second API call is made and
    // and the response gotten back and set as state
  const sendNameToDb = async(name) => {
    let parsedName = stringParser(name);
    console.log("parsedName", parsedName);
    const sendTheName = await fetch('http://localhost:5050/wikiData', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({name: parsedName})
    }).then(res=> res.json())
    .then( data => {
      console.log("data", data);
      setDataGottenFromWiki(data);
      // here we use the name of the battle, as included on the Db data 
      // as reference to access the additional data from the dB
      for(const battle of battlesData){
        if(battle.name === name){
          setBattleInfoDb(battle.info)
          setBattleImgDb(battle.img)
        }
      }
    })
  }
  
  return (
    <div className="mainAppContainer vignette">
  
      <div className="mapContainer">
      <div className="map">
        <BattlesDataContext.Provider value={{battlesData}}>
          <Map battlesData={filteredBattles} sendNameToDb={(name)=> sendNameToDb(name)}/>
        </BattlesDataContext.Provider>
      </div>
      <div className="slider">
        <DiscreteSliderMarks changeYearValues={changeYearValues}/>
      </div>
      </div>
        <div className="innerInfoContainer">
          <div className="parchmentBackground">
            <div className="whereTheTextInfoIsDisplayedOn">
              <h1>Historic Battles of Britain</h1>
              <div> 
                {battleImgDb? <img src={battleImgDb} alt="an image of the battle" className="img"/> : ""}
              </div>
              <h3>{battleTitle? battleTitle: "" }</h3>
              <div className="scroll">
                  {battleInfoDb? battleInfoDb: ""}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
