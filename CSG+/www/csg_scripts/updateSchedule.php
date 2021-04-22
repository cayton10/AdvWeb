<?
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

$request = json_decode(file_get_contents('php://input'));

if(isset($request) && !empty($request))
{
    $response = [];

    //Sanitize, even tho it's all JS logic driven and there is no
    //form input. Just a good habit.
    print_r($request);

    
}

?>