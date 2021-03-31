
let assetPath;
let script;

/**
 * Setting asset path for images based on Node process environment
 * Need absolute path / for development.
 * 
 * Setting scripts path here in case I deploy this somewhere else at some point
 */
if(process.env.NODE_ENV === "production") {
    assetPath =  "";
    script = "http://localhost";
}
else if(process.env.NODE_ENV === "development"){
    assetPath = "/";
    script = "http://localhost";
}


const config = {
    path: assetPath,
    scriptServer: script,
}


export default config;