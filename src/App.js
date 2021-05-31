import logo from './logo.svg';
import './App.css';
import {useCallback, useState} from "react";
import axios from "axios";

function App() {
    const [responseData, setResponseData] = useState(['Here comes info']);
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: 'estonia'},
        headers: {
            'x-rapidapi-key': '457a49cbd2msh587809b267ee184p1965ffjsn4b06828b27cb',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        },
    };
    const fetchData = useCallback(() => {
        axios(options)

            .then((response) => {
                console.log(response)
                setResponseData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <button type='button' onClick={fetchData}> STATISTICS FOR ESTONIA
                </button>

                {JSON.stringify(responseData.data)}

            </header>
        </div>
    );
}

export default App;
