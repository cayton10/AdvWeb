<?
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//must decode the json format we're receiving & get input
$request = json_decode(file_get_contents('php://input'));

print_r($request);
?>