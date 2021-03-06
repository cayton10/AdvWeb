# Small React App (Using APIs)

## Install Issues:

There were some issues with getting [this theme](https://www.creative-tim.com/product/light-bootstrap-dashboard-react#) up and running. Multiple issues here. 

- At the time of developing this docker box, this theme is not supported with Node.js Version 15.X
- As a result this application uses Node.js Version 14.16.X
- Within the docker-compose file we have to rebuild the Node-Sass dependencies on spinning up the container. 

```bash
command: bash -c "npm install && npm rebuild node-sass && npm start "
```

Later changed the above command to include:
``` bash
npm install axios
```

So, as of <strong>3.1.2021</strong> the theme compiles and runs. Now it's time to gut the thing and build components / functions and make API calls.


## Building Out Components

### Stocks Component

#### <strong>Notice</strong>

If not all stocks are displayed, it's because I forgot to uncomment the const tickers array which contains the abbreviations for each IPO. The Alpha Vantage API limits queries to 5 / minute and 500 / day. During development of this application, I had to do a lot of page reloading to test, so I didn't want to max out my allowance.

### Weather Component



## APIs in Use:

- Current weather information (use openweathermap APIs to display temp, forecast and city information (Huntington))
- Current stock information (use https://www.alphavantage.co/ and include Apple, Microsoft, and Amazon stock in dashboard boxes)
- Display at least 5 comics by title in a dropdown that once a user selects a comic, its image is displayed within the dashboard (https://xkcd.com/json.html).  The dropdown MUST be populated using the API.

