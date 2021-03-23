# Course Schedule Generator +

## Theme Development
This project was started by copying the Dev_Container directory and changing some docker-compose specifics. Mainly, it invloves just renaming some directories and setting appropriate volumes / directory structures.

### Note:
When installing bootstrap with docker-compose.yaml, if your run 
```bash
docker-compose up
```
with no -d flag (detached), You'll get process information as the containers spin up. In the node spin up, you'll get a notice that bootstrap has peer dependencies for jQuery and that you must install them yourself. Hence, 
```bash
npm install jquery --save
```
was included in the docker-compose file during the build phase of this container. My only <strong>GRIPE</strong> with using docker in this capacity is if you identify a dependency that you need, you've got to kill your container, change the compose file to install and save your desired dependency and then spin up again. Of course, you could probably just SSH into the node container and run the commands from the VM terminal. If I run into more of these dependency problems, that's what I'll try next.

### Dependencies
Use [this](https://phase2.github.io/devtools/common-tasks/ssh-into-a-container/) to SSH into the node container and
```bash
npm install --save {packageName}
``` 
By using the --save flag, we'll add the package to our package.json dependency file and reduce spin up time with docker-compose after the initial image has been built.

## Routing
We also need to use routing for this project and in order to do so, we need react routing capabilities. The following command is included in the docker-compose.yaml file
```bash
npm install --save react-router-dom 
```

### Routing with Subdirectories
Since this docker container is meant to act as a "portable repo", as well as a tool for development and production testing, it's necessary to be able to keep writing applications while also deploying them to a production environment. In order to have it both ways without having to specify paths for routing, the "homepage" variable in the project package.json to:
```JSON
homepage: "."
```
in essence this tells the final build to reference whatever path the project is stored in as the root.

### Course Detail Routing
Going to need to go into more detail on how to correctly route the content for this from the table view of course offerings. I can't figure out where I'm going wrong with it. Tried <Redirect> but that didn't work.

## Components
Base components built for the theme generally just output the HTML required to give the site structure. These components are also the primary components used for routing between each required 'page' on CSG+.

### App
The app component is the one that comes together the easiest, since this component is essentially where everything gets linked. The only rendering that needs done outside of all of the <Route>'s generated are for place holders (text boxes, imgs, etc).

### Footer
The footer component was built as a functional stateless component simply for ease. I initially just left this in the App.js component as a function outside of the component rendering, but I decided to move it because, ya know... good coding practice.

### AddClassInfo
Simple form layout for adding classes. Used bootstrap examples and ported them into the component

### Admin
Unsure about what's supposed to be visible by the admin here. Will have to follow up with class questions

### ClassDetail
I'm getting lost in the routing for this and starting to get the feeling I'm approaching it incorrectly.

### Home
Place holder images and text for the eventual home page, which will be comprised of stock academic images and some text about what CSG is for, how to use, etc.

### ListOfCourses
Ported a bootstrap table from [getbootstrap.com](https://getbootstrap.com/docs/4.0/content/tables/) and tailored to fit the project description.

### Login
Simple form layout for loggin in a user. Takes field parameters, email and password

### Register
Similar to above.

### Schedule Review
Similar to ListOfCourses component albiet with more detail. I'll also have to figure out routing for displaying the syllabi.


