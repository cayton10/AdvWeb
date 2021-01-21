# AdvWeb

### Docker Project

I tried for a while to get things to integrate together, and in doing research into problems I stumbled upon a really helpful repo for constructing a containerized LAMP development stack. I relied pretty heavily on the build files for php and apache. My biggest issues before relying on this repo were centered around apache configurations and actually being able to access files from localhost. <- I was researching <Directories> options for apache and that's how I found the repo. You can view it yourself here: https://github.com/sprintcube/docker-compose-lamp

I changed some things, obviously and have had to add a node.js image for React support. 


#### Nodejs Image

I was wondering why all the other images in the stack were spinning up, but node refused to. Have to mount a volume with a package.json file for a corresponding application for the container to actually run. Also have to issue commands in the docker-compose.yml file to npm install and npm run. When combining commands on a single docker-compose command line:
```shell
bash -c "npm install && npm start"
```