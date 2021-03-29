
let assetPath;
let proxyPath;

/**
 * Setting asset path for images based on Node process environment
 * Need absolute path / for development.
 * 
 * Can't use http://localhost as proxy in package.json because it never
 * escapes the 3000 Node port. Have to spec it here and declare absolute
 * path in axios calls to hit scripts on apache server. This still isn't 
 * working though :'(
 */
if(process.env.NODE_ENV === "production") {
    assetPath =  "";
    proxyPath = "http://localhost";
}
else if(process.env.NODE_ENV === "development"){
    assetPath = "/";
    proxyPath = "http://localhost";
}


const config = {
    path: assetPath,
    proxy: proxyPath,
}


export default config;