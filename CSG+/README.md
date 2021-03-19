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
By using the --save flag, we'll add the package to our package.json dependency file and reduce spin up time with docker-compose after the initial image has been built

## Routing
We also need to use routing for this project and in order to do so, we need react routing capabilities. The following command is included in the docker-compose.yaml file
```bash
npm install --save react-router-dom 
```
