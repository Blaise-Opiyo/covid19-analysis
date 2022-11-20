import { useState, useEffect } from 'react';
import '../Styles/GraphVisual.css';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const GraphVisual = () =>{
    const [historyData, setHistoryData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() =>{
        fetchHistoryData();
    }, []);
    
    useEffect(() =>{
        // console.log(historyData);
        historyData.forEach((data) =>{
            const hourTime = data.time.substr(11, 5);
            const dataCases = Number(data.cases.new.replace('+', ''));
            const criticalCases = Number(data.cases.critical);
            const dataDeaths = Number(data.deaths.new.replace('+', ''));

            setAllData(initialData => [...initialData, {timeInHours: hourTime, 
                                                        new_cases: dataCases,
                                                        critical_cases: criticalCases,
                                                        new_deaths: dataDeaths}]);
        })
        // console.log(allData);

    }, [historyData]);
    const fetchHistoryData = () =>{
        const currentDate = (new Date()).toISOString().split('T')[0];
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9ca9d1c213msh3819744b78ddac6p187157jsn7a9bfbdf66ad',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };
        
        fetch(`https://covid-193.p.rapidapi.com/history?country=all&day=${currentDate}`, options)
            .then(response =>{ 
                return response.json()
            }).then(data =>{ 
                // console.log("History Data Successfull");
                setHistoryData(data.response);
            }).catch(err => console.error(err));
    }

    return(
        (historyData.length === 0) ? 
        (<div className="lds-ripple"><div></div><div></div></div>) :
        (<div className="Graphic-wrapper">
            <ResponsiveContainer>
                <LineChart data={allData.sort((a,b)=> a.timeInHours.localeCompare(b.timeInHours))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeInHours" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="new_cases" stroke="rgb(40,202,0)" strokeWidth={2}/>
                    <Line type="monotone" dataKey="critical_cases" stroke="rgb(0,195,255)" strokeWidth={2}/>
                    <Line type="monotone" dataKey="new_deaths" stroke="rgb(255,81,81)" strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </div>)
    )
}
export default GraphVisual;