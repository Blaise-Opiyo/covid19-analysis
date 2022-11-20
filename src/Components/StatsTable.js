import { useState, useEffect } from 'react';
import '../Styles/StatsTable.css';
import '../Styles/Loader.css';

const StatsTable = () =>{
    const [statistics, setStatistics] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(()=>{
        fetchStatistics();
    },[]);
   
    const fetchStatistics = () =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9ca9d1c213msh3819744b78ddac6p187157jsn7a9bfbdf66ad',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };
        fetch('https://covid-193.p.rapidapi.com/statistics', options)
        .then(response =>{
            return response.json();
        }).then(data =>{
            setStatistics(data.response);
            // console.log(data.response);
        }).catch(err => console.error(err));
    }

    const getSearch = (e) =>{
        setSearch(e.target.value);
        // console.log(search);
    }

    return(
        (statistics.length === 0) ? 
        (<div className="lds-ripple"><div></div><div></div></div>) :
        (<div className="Stats-wrapper">
            <form className="search-country">
                <input type="text" name="country" placeholder="Search country" onChange={getSearch}/>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th className="res-hide">Tests</th>
                        <th>Confirmed</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        statistics.filter((statistic) =>{
                            return (
                                search.length === 0 ? statistic : statistic.country.includes(search)
                            )
                        }).map((statistic) =>{
                            return (
                                <tr key={statistic.country}>
                                    <td>{statistic.country}</td>
                                    <td className="res-hide">{Number(statistic.tests.total).toLocaleString()}</td>
                                    <td>{Number(statistic.cases.total).toLocaleString()}</td>
                                    <td>{Number(statistic.cases.recovered).toLocaleString()}</td>
                                    <td>{Number(statistic.deaths.total).toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>)
    )
}
export default StatsTable;