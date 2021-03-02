# Small React App (Using APIs)

### Install Issues:

There were some issues with getting [this theme](https://www.creative-tim.com/product/light-bootstrap-dashboard-react#) up and running. Multiple issues here. 

- At the time of developing this docker box, this theme is not supported with Node.js Version 15.X
- As a result this application uses Node.js Version 14.16.X
- Within the docker-compose file we have to rebuild the Node-Sass dependencies on spinning up the container. 

```bash
command: bash -c "npm install && npm rebuild node-sass && npm start "
```

So, as of <strong>3.1.2021</strong> the theme compiles and runs. Now it's time to gut the thing and build components / functions and make API calls.

### APIs in Use:


