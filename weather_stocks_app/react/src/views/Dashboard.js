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
const tickers = ["AAPL", "AMZN", "MSFT"];


class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      stockQueries: [],
      stocks: [],
    }
  }

  //Auto load up the stock queries
  stockQueries = tickers.map( item => `${STOCKS_PATH_BASE}${STOCKS_FUNCTION}${item}${STOCKS_API_KEY}`); 

  getStockInfo(stockQueries) {

    //Temporary array used to set state of 'stocks' state array
    const tempStock = [];
    stockQueries.map(query => (
      axios(query).then(result => this.is_Mounted && tempStock.push(result.data))
    ))

    this.setState({stocks: tempStock});
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

  return (
      <>
        <Container fluid>
          <Row>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  {console.log(this.state.stocks)}
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart text-warning"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Number</p>
                        <Card.Title as="h4">150GB</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-light-3 text-success"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <Card.Title as="h4">$ 1,345</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Last day
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Errors</p>
                        <Card.Title as="h4">23</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-clock-o mr-1"></i>
                    In the last hour
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Followers</p>
                        <Card.Title as="h4">+45K</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
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

const Stocks = ({props}) => (

    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-chart text-warning"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Number</p>
                <Card.Title as="h4">150GB</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="fas fa-redo mr-1"></i>
            Update Now
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );

export default Dashboard;
