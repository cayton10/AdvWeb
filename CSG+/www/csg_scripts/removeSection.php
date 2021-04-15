<?
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//must decode the json format we're receiving & get input
$request = json_decode(file_get_contents('php://input'));

if(isset($request) && !empty($request))
{

    $response = [];

    //Sanitize
    $classID = $request->section;
    $userID = $request->user;

    $schedule = new UserSchedule();

    //Remove class from user schedule
    $operation = $schedule->removeClass($classID, $userID, $con);

    echo json_encode($operation);
}
?>