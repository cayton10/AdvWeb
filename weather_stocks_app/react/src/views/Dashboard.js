import axios from "axios";
import React, { Component } from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";


/* -------------------------------------------------------------------------- */
/*                             API QUERY CONSTANTS                            */
/* -------------------------------------------------------------------------- */

/* --------------------------------- STOCKS --------------------------------- */
const STOCKS_API_KEY = '&apikey=2JQW3ZWVG48BXS4C';
const STOCKS_PATH_BASE = 'https://www.alphavantage.co/query?';
const STOCKS_FUNCTION = 'function=GLOBAL_QUOTE&symbol=';
const tickers = ["AAPL", "AMZN", "MSFT"];

/* --------------------------------- WEATHER -------------------------------- */
const WEATHER_API_KEY = 'bd1f6f876baf2ee1284c249612206fe3';
const WEATHER_PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const WEATHER_ZIP_CODE = '25705,';
const WEATHER_COUNTRY_CODE = 'us';
const WEATHER_UNITS = 'imperial';

/* ---------------------------------- COMIC --------------------------------- */
const COMIC_PATH_BASE = 'https://xkcd.com/';
const COMIC_PATH_END = '/info.0.json';


class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      stockQueries: [],
      stocks: [],
      stocksLoaded: false,
      weatherQuery: null,
      weather: [],
      weatherLoaded: false,
      comics: [],
      comicsLoaded: false,
    }
  }

/* ----------------------------- STOCK FUNCTIONS ---------------------------- */

  //Auto load the stock queries
  stockQueries = tickers.map( item => `${STOCKS_PATH_BASE}${STOCKS_FUNCTION}${item}${STOCKS_API_KEY}`);

  getStockInfo(stockQueries) {

    stockQueries.map(query => (
      axios(query)
        .then(result => this.is_Mounted && this.setStocks(result.data))
    ))
  }

  //Set state of stocks array
  setStocks(stock) {
    this.setState({
      stocks: this.state.stocks.concat(stock),
      stocksLoaded: true
    }); //Concat operator for appending stock to state array
  }

/* ---------------------------- WEATHER FUNCTIONS --------------------------- */

  //Auto construct weather query
  weatherQuery = `${WEATHER_PATH_BASE}${WEATHER_ZIP_CODE}${WEATHER_COUNTRY_CODE}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`;

  getWeatherInfo(weatherQuery) {
    axios(weatherQuery)
      .then(result => this.is_Mounted && this.setWeather(result.data)
      )}

  //Set weather state array variable
  setWeather(weather) {
    this.setState({
      weather: {weather},
      weatherLoaded: true
    });
  }

/* ----------------------------- COMIC FUNCTIONS ---------------------------- */

  //Generate 5 unique, random comic tags between 1-200
  setComicQueries() {

    let nums = [];
    let queries = [];

    while(nums.length < 5)
    {
      let rand = Math.floor(Math.random() * 100) + 1;

      if(nums.indexOf(rand) === -1)
        nums.push(rand);
    }

    //Now construct queries
    for(var i = 0; i < nums.length; ++i) {
      var query = `${COMIC_PATH_BASE}${nums[i]}${COMIC_PATH_END}`

      queries.push(query);
    }


    this.getComics(queries);

  }

  getComics(comicQuery) {
    console.log(comicQuery);
    /*comicQuery.map(query => (
      axios(query)
        .then(result => this.setComics(result.data) && console.log(query))
    ))*/
  }

  setComics(comic) {
    this.setState({
      comics: this.state.comics.concat(comic),
      comicsLoaded: true,
    });
  }
  
  
  componentDidMount() {
    //When component mounts, fire the stock queries and load stocks array
    this.getStockInfo(this.stockQueries);
    //Fire weather info and load weather
    this.getWeatherInfo(this.weatherQuery);
    //Generate comic queries
    this.setComicQueries();


    this.is_Mounted = true;
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }
  
  render() {

    //Destructure state variables
    const {stocksLoaded} = this.state;
    const {stocks} = this.state;
    const {weatherLoaded} = this.state;
    const {weather} = this.state;
    const {comicsLoaded} = this.state;
    const {comics} = this.state;

  return (
      <>
        <Container fluid>
          <Row>
            {
              //set up conditional (only 5 queries/min from API)
              stocksLoaded ?
              <Stocks stocksFromParent={stocks} />
              : null
            }
                      
          </Row>
          <Row>
          {
            weatherLoaded ?
            <Weather weatherFromParent={weather.weather} />
            :null
          }
          <Col sm="6">
            <Row>
              {
                comicsLoaded ?
                console.log(comics)
                : null
              }
              <Form>
                <Form.Label>Pick a Comic</Form.Label>
                <Form.Control as='select' custom>
                  <option>1</option>
                </Form.Control>
              </Form>
            </Row>
          </Col>
          </Row>

        </Container>
      </>
    );
  }
}

const Comic = ({path}) => {

  
}


const Weather = ({weatherFromParent}) => {
  
  //alias properties
  const w = weatherFromParent;
  const city = w.name;
  const weatherType = w.weather[0].main;
  const weatherDesc = w.weather[0].description;
  const windSpeed = w.wind.speed;
  const windDirection = w.wind.deg;
  const pressure = w.main.pressure;
  const feel = w.main.feels_like;
  const humid = w.main.humidity;
  const temp = w.main.temp;


  //URL for current weather icon
  const icon = `http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`;

return(
  
  <Col sm="6">
    <Card>
      <Card.Header>
        <Card.Title as="h4">Weather in {city}</Card.Title>
      </Card.Header>
      <Card.Body>
        <img className="weatherIcon" src={icon} />

          <Row className="weatherRow">
            <h4 className="weatherType">{weatherType}</h4>
          </Row>



        <Row className="weatherRow">
          <Col sm="6">
            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Description:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{weatherDesc}</p>
              </Col>
            </Row>

            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Wind Speed:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{windSpeed} MPH</p>
              </Col>
            </Row>

            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Wind Direction:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData"><WindDirection deg={windDirection} /></p>
              </Col>
            </Row>

            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Pressure:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{pressure} mb</p>
              </Col>
            </Row>
          </Col>
        


          <Col sm="6">
            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Temperature:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{temp}</p>
              </Col>
            </Row>

            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Humidity:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{humid}%</p>
              </Col>
            </Row>

            <Row>
              <Col sm="6" className="weatherDatField">
                <p className="card-category">Feels Like:</p>
              </Col>
              <Col sm="6" className="weatherDatField">
                <p className="weatherData">{feel}</p>
              </Col>
            </Row>
          </Col>

        </Row>

      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="fas fa-history"></i>
          Updated 3 minutes ago
        </div>
      </Card.Footer>
    </Card>
  </Col>
  )
};




//Functional 'stateless' component for Stocks
const Stocks = ({stocksFromParent}) => (

stocksFromParent.map( stock => {
  //Let's ease the burden here, eh?
  const s = stock['Global Quote'];
  const currentPrice = parseFloat(s['05. price']);
  const previousClose = parseFloat(s['08. previous close']);
  const percentChange = parseFloat(s['10. change percent']).toFixed(2);
  let format = '';
  //Conditional formatting for percentage
  if(percentChange < 0)
  {
    format = "negative";
  }
  else
  {
    format = "positive";
  }

  return(

    <Col xl="4" lg="6" md="6" sm="6" key={s['01. symbol']}>
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning ticker-img-div">
                <img className="stockImage" src={`../${s['01. symbol']}.svg`}/>
              </div>
            </Col>
            <Col xs="7" className="tickerInfo">
              <div className="numbers">
                <p className="card-category symbolText">TCKR SYMBOL</p>
                <Card.Title as="h4">{s['01. symbol']}</Card.Title>
              </div>
            </Col>
            <Col>
              <div className="statistics">
                <Row className="firstRow">
                  <Col sm="6">
                    <div className="stockParam">
                      <p className="card-category">Last Trading Day:</p>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="paramInfo">
                      <span className="paramData">{s['07. latest trading day']}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <div className="stockParam">
                      <p className="card-category">Closing Price:</p>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="paramInfo">
                      <span className="paramData">${currentPrice}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <div className="stockParam">
                      <p className="card-category">Previous Close:</p>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="paramInfo">
                      <span className="paramData">${previousClose}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <div className="stockParam">
                      <p className="card-category">Percent Change:</p>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="paramInfo">
                      <span className={format}>%{percentChange}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="fas fa-redo mr-1"></i>
          </div>
        </Card.Footer>
      </Card>
    </Col>
    )})
)

const WindDirection =({deg}) => {

  if (deg>11.25 && deg<=33.75){
    return "NNE";
  }else if (deg>33.75 && deg<=56.25){
    return "ENE";
  }else if (deg>56.25 && deg<=78.75){
    return "E";
  }else if (deg>78.75 && deg<=101.25){
    return "ESE";
  }else if (deg>101.25 && deg<=123.75){
    return "ESE";
  }else if (deg>123.75 && deg<=146.25){
    return "SE";
  }else if (deg>146.25 && deg<=168.75){
    return "SSE";
  }else if (deg>168.75 && deg<=191.25){
    return "S";
  }else if (deg>191.25 && deg<=213.75){
    return "SSW";
  }else if (deg>213.75 && deg<=236.25){
    return "SW";
  }else if (deg>236.25 && deg<=258.75){
    return "WSW";
  }else if (deg>258.75 && deg<=281.25){
    return "W";
  }else if (deg>281.25 && deg<=303.75){
    return "WNW";
  }else if (deg>303.75 && deg<=326.25){
    return "NW";
  }else if (deg>326.25 && deg<=348.75){
    return "NNW";
  }else{
    return "N"; 
  }
}




export default Dashboard;
