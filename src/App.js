import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Button,
    CardContent,
    CardHeader, CardMedia,
    ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {AppBar} from "@material-ui/core";
import {Card} from "@material-ui/core";

const useStyles = makeStyles({
    textStyle: {
        fontStyle: 'oblique',
        color: 'ivory',
        fontSize: '-moz-initial',
        fontFamily: 'inherit'
    },
    buttonStyles: {
        color: 'red',
        background: 'aliceblue',
        border: '0'
    }, cardStyle: {
        color: 'green',
        background: 'azure'
    }
});

function App() {
    const classes = useStyles();
    const [responseData, setResponseData] = useState('');
    const [cases, setCases] = useState('');
    const [deaths, setDeaths] = useState('');
    const [day, setDay] = useState('');
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
                setDay(response.data.response[0].day);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [options])
    console.log(responseData);
    console.log(responseData.day);
    console.log(cases.["1M_pop"]);
    console.log(cases.active);
    console.log(deaths.new);
    console.log(deaths.total);

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Typography variant={"h3"}>
                    Covid-19 in Estonia
                </Typography>
            </AppBar>
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <Button
                    className={classes.buttonStyles}
                    variant='outlined'
                    color='inherit'
                    disableElevation type='button'
                    onClick={fetchData}> Fresh statistics
                </Button>

                <Typography
                    align={'left'}
                    color={'primary'}
                    className={classes.textStyle}
                >
                    <ListItem>New deaths in last 24h: {deaths && deaths.new} persons </ListItem>
                    <ListItem>Total deaths: {deaths && deaths.total} persons </ListItem>
                    <ListItem>New cases in last 24h: {cases && cases.new} persons </ListItem>
                    <ListItem>Active cases: {cases && cases.active} persons </ListItem>
                    <ListItem>Cases per 1M capita: {cases && cases.['1M_pop']} persons</ListItem>
                    <ListItem> Statistics for: {day} </ListItem>
                </Typography>
            </header>
        </div>
    );
}

export default App;
