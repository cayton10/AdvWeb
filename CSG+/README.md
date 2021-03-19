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
is included in the docker-compose file.

## Routing