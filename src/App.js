import { useState, useEffect } from 'react';
import './App.css';
import './Styles/Loader.css'
import covid_19_t_image from './Assets/covid-19 t-image.png';
import GraphVisual from './Components/GraphVisual';
import StatsTable from './Components/StatsTable';

const App = () =>{
  const [globalData, setGlobalData] = useState([]);

  useEffect(() =>{
    fetchGlobalData();
  }, [])

  const fetchGlobalData = () =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9ca9d1c213msh3819744b78ddac6p187157jsn7a9bfbdf66ad',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    
    fetch('https://covid-193.p.rapidapi.com/statistics?country=all', options)
      .then(response =>{ 
        return response.json()
      }).then(data =>{
        setGlobalData(data.response[0]);
        // console.log("Global Data Fetched Successfully");
        // console.log(data.response[0]);
      }).catch(err => console.error(err));
  }

  return (
    (!globalData.cases) ? 
    (<div className="lds-ripple"><div></div><div></div></div>) : 
    (<div className="App">
      <div className="Main-wrapper">
        <div className="head">
            <div className="head-banner">
              <div className="banner">
                <img src={covid_19_t_image} alt="Covid-19 logo"/>
              </div>
              <div className="title-meta">
                <h2>COVID-19</h2>
                <h3>Analysis</h3>
              </div>
            </div>
            {/* <div className="head-meta">UI by Blaise</div> */}
        </div>

        <div className="Global-overview">
          <div className="overview-title">
            Global overview
          </div>
          <div className="overview-details">
              <div className="cases-overview tests">
                <div className="cases-title" style={{color:"rgb(56,101,123)"}}>Active</div>
                <div className="cases-numbers" style={{color:"rgb(23,162,184)"}}>{globalData.cases.active.toLocaleString()}</div>
              </div>
              <div className="cases-overview confirmed">
                <div className="cases-title" style={{color:"rgb(78,123,171)"}}>Confirmed</div>
                <div className="cases-numbers" style={{color:"rgb(0,195,255)"}}>{globalData.cases.total.toLocaleString()}</div>
              </div>
              <div className="cases-overview recovered">
                <div className="cases-title" style={{color:"rgb(59,98,47)"}}>Recovered</div>
                <div className="cases-numbers" style={{color:"rgb(40,202,0)"}}>{globalData.cases.recovered.toLocaleString()}</div>
              </div>
              <div className="cases-overview deaths">
                <div className="cases-title" style={{color:"rgb(119,45,57)"}}>Deaths</div>
                <div className="cases-numbers" style={{color:"rgb(255,81,81)"}}>{globalData.deaths.total.toLocaleString()}</div>
              </div>
              
          </div>
          <div className="overview-title">
            Hourly history graph
          </div>
          <GraphVisual />

          <div className="overview-title">
            Statistics table
          </div>
          <StatsTable />
        </div>
      </div>
    </div>)
  );
}

export default App;
