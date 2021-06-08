import './App.css';
import React, {useCallback, useState} from "react";
import axios from "axios";
import {
    Button, Card, CardContent, Typography, TextField, MenuItem
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {AppBar} from "@material-ui/core";
import logo from './Est.jpg';
import {getCountry} from './countries';

// here is Material UI styles for different thing (text, button and card)
const useStyles = makeStyles({
    textStyle: {
        fontStyle: '-moz-initial',
        color: 'inherit',
        fontSize: 'large',
        fontFamily: 'sans-serif',
        fontVariant: 'all-petite-caps',

    },
    buttonStyles: {
        color: 'white',
        background: 'green',
        border: '5'
    },
    cardStyle: {
        background: 'aqua',
        border: 'red',
        borderStyle: 'double',

    }
});

function App() {
    const classes = useStyles();
    const [responseData, setResponseData] = useState('');
    const [cases, setCases] = useState('');
    const [deaths, setDeaths] = useState('');
    const [day, setDay] = useState('');
    const [countryInput, setCountryInput] = useState('');
    const countries = getCountry();
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: countryInput},
        headers: {
            'x-rapidapi-key': '457a49cbd2msh587809b267ee184p1965ffjsn4b06828b27cb',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        },
    };
    // here is the method that calls the API for Covid data.
    // I used 'useCallback' like my example, but it's like 'useEffect'.
    // useCallback loads a memoized response and every value referenced inside the callback
    // should also appear in the dependencies array
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
    }, [options],)
    console.log(responseData);
    console.log(countryInput);
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
                {/*<TextField fullWidth*/}
                {/*           id="country"*/}
                {/*           label="choose country"*/}
                {/*           variant="outlined"*/}
                {/*           value={countryInput}*/}
                {/*           InputLabelProps={{*/}
                {/*               shrink: true,*/}
                {/*           }}*/}
                {/*           onChange={e => setCountryInput(e.target.value)}*/}
                {/*/>*/}
                <TextField
                    id="country"
                    label="Choose country"
                    variant="outlined"
                    select
                    required
                    fullWidth
                    value={countryInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setCountryInput(e.target.value)}
                >
                    {countries.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    className={classes.buttonStyles}
                    variant='outlined'
                    color='inherit'
                    disableElevation type='button'
                    onClick={fetchData}> Fresh statistics
                </Button>

                <Typography
                    align={'inherit'}
                    className={classes.textStyle}
                    color={'primary'}
                    display={'block'}
                >

                    <Card className={classes.cardStyle}>
                        <CardContent>Deaths in last 24h: {deaths && deaths.new}  </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>Total deaths: {deaths && deaths.total}  </CardContent>
                    </Card>
                    <Card className={classes.cardStyle}>
                        <CardContent>New cases in last 24h: {cases && cases.new}  </CardContent>
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
