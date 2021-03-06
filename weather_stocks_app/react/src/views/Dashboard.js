import axios from "axios";
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


/* -------------------------------------------------------------------------- */
/*                             API QUERY CONSTANTS                            */
/* -------------------------------------------------------------------------- */

const STOCKS_API_KEY = '&apikey=2JQW3ZWVG48BXS4C';
const STOCKS_PATH_BASE = 'https://www.alphavantage.co/query?';
const STOCKS_FUNCTION = 'function=GLOBAL_QUOTE&symbol=';
const tickers = ["MSFT"];


class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      stockQueries: [],
      stocks: [],
      stocksLoaded: false,
    }
  }

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

  componentDidMount() {
    //When component mounts, fire the stock queries and load stocks array
    this.getStockInfo(this.stockQueries);
    
    this.is_Mounted = true;
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }
  
  render() {

    const {stocksLoaded} = this.state;
    const {stocks} = this.state;

  return (
      <>
        <Container fluid>
          <Row>
            {
              stocksLoaded ?
              console.log(stocks)
              : null
            }
            
            {
              //set up conditional (only 5 queries/min from API)
              stocksLoaded ?
              <Stocks stocksFromParent={stocks} />
              : null
            }
                      
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Users Behavior</Card.Title>
                  <p className="card-category">24 Hours performance</p>
                </Card.Header>
                <Card.Body>
                  <div className="ct-chart" id="chartHours">
                    <ChartistGraph
                      data={{
                        labels: [
                          "9:00AM",
                          "12:00AM",
                          "3:00PM",
                          "6:00PM",
                          "9:00PM",
                          "12:00PM",
                          "3:00AM",
                          "6:00AM",
                        ],
                        series: [
                          [287, 385, 490, 492, 554, 586, 698, 695],
                          [67, 152, 143, 240, 287, 335, 435, 437],
                          [23, 113, 67, 108, 190, 239, 307, 308],
                        ],
                      }}
                      type="Line"
                      options={{
                        low: 0,
                        high: 800,
                        showArea: false,
                        height: "245px",
                        axisX: {
                          showGrid: false,
                        },
                        lineSmooth: true,
                        showLine: true,
                        showPoint: true,
                        fullWidth: true,
                        chartPadding: {
                          right: 50,
                        },
                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                    />
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Open <i className="fas fa-circle text-danger"></i>
                    Click <i className="fas fa-circle text-warning"></i>
                    Click Second Time
                  </div>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-history"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const Stocks = ({stocksFromParent}) => (

stocksFromParent.map( stock => {
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
            <div className="icon-big text-center icon-warning">
              <img className="stockImage" src={`../${s['01. symbol']}.svg`}/>
            </div>
          </Col>
          <Col xs="7" className="tickerInfo">
            <div className="numbers">
              <p className="card-category symbolText">SYMBOL</p>
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
                    <p className="card-category">Current Price:</p>
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
  

);

export default Dashboard;
