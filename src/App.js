import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState} from "react";
import axios from "axios";
import {Button, makeStyles} from "@material-ui/core";


function App() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }));
    const [responseData, setResponseData] = useState('');
    const [cases, setCases] = useState('');
    const [deaths, setDeaths] = useState('');
    const [time, setTime] = useState('');
    const [newCases, setNewCases] = useState('');
    const [newDeaths, setNewDeaths] = useState('');
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
                console.log(response);
                setResponseData(response.data.response[0]);
                setCases(response.data.response[0].cases);
                setDeaths(response.data.response[0].deaths);
                setTime(response.data.response[0].time);
                setNewCases(response.data.response[0].new);
                setNewDeaths(response.data.response[0].new);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [options])
    console.log(responseData);
    console.log(Date(time));
    console.log(cases.["1M_pop"]);
    console.log(deaths.total);
    console.log(cases.new);
    console.log(deaths.new);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Button variant='contained'
                        color='primary'
                        disableElevation type='button'
                        onClick={fetchData}> COVID 19
                    IN ESTONIA
                </Button>
                <ul>
                    <p>Last update: {responseData && Date(time)} </p>
                    <p>Cases per 1M capita: {cases && cases.['1M_pop']} persons</p>
                    <p>Total deaths: {deaths && deaths.total} persons </p>
                    <p>Active cases: {cases && cases.active} persons </p>
                    <p>New cases in last 24h: {cases && cases.new} persons </p>
                    <p>New deaths in last 24h: {deaths && deaths.new} persons </p>
                </ul>
            </header>

        </div>
    );
}

export default App;
