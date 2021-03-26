
let assetPath;

if(process.env.NODE_ENV === "production") {
    assetPath =  "";
}
else if(process.env.NODE_ENV === "development"){
    assetPath = "/";
}


const config = {
    path: assetPath,
}


export default config;