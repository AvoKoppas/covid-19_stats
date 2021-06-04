import './App.css';
import React, {useCallback, useState} from "react";
import axios from "axios";
import {
    Button, Card, CardContent,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {AppBar} from "@material-ui/core";
import logo from './Est.jpg'

const useStyles = makeStyles({
    textStyle: {
        fontStyle: '-moz-initial',
        color: 'black',
        fontSize: 'large',
        fontFamily: 'monospace',
    },
    buttonStyles: {
        color: 'white',
        background: 'green',
        border: '5'
    },
    cardStyle: {
        background: 'aqua',
        border: 'black',
        borderStyle: 'ridge'
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

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Typography variant={"h3"}
                            align={'center'}
                            color={'initial'}>
                    Covid-19 in Estonia
                </Typography>
            </AppBar>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
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
                    className={classes.textStyle}>
                    <Card className={classes.cardStyle}>
                        <CardContent>New deaths in last 24h: {deaths && deaths.new} persons </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>Total deaths: {deaths && deaths.total} persons </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>New cases in last 24h: {cases && cases.new} persons </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>Critical cases: {cases && cases.critical} </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>Active cases: {cases && cases.active} </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>Cases per 1M persons: {cases && cases.['1M_pop']} </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent> Statistics for: {day} </CardContent>
                    </Card>
                </Typography>
            </header>
        </div>
    );
}

export default App;
