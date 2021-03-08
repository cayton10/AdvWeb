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

Took a hot minute to get stock information to print. I was setting state, but <em>incorrectly<em> I guess.

The component build could definitely be better. I could see how it would make things more readable by making another component to add "data rows" to the stock cards. This is something I'd like to come back to, if I can find the time (18 hours of classes).

#### <strong>Notice</strong>

If not all stocks are displayed, it's because I forgot to uncomment the const tickers array which contains the abbreviations for each IPO. The Alpha Vantage API limits queries to 5 / minute and 500 / day. During development of this application, I had to do a lot of page reloading to test, so I didn't want to max out my allowance.

### Weather Component

#### 3.8.2021

Weather functions as it should. After having worked with React for a couple of days, I can see how this framework can be advantageous for outputting HTML structure to the page. I need to go back and refactor this code when I have some free time. For instance, the weather component could be broken up into more components for enhanced readability and better code reuse.

I'm recycling a lot of elements / repeating a lot of HTML structure, where I could just make a component to output each data row for me instead of cluttering everything up. 


## APIs in Use:

- Current weather information (use openweathermap APIs to display temp, forecast and city information (Huntington))
- Current stock information (use https://www.alphavantage.co/ and include Apple, Microsoft, and Amazon stock in dashboard boxes)
- Display at least 5 comics by title in a dropdown that once a user selects a comic, its image is displayed within the dashboard (https://xkcd.com/json.html).  The dropdown MUST be populated using the API.

