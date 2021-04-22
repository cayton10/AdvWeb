<?
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

$request = json_decode(file_get_contents('php://input'));

if(isset($request) && !empty($request))
{
    $response = [];

    $user_id = $request->userID;
    $schedule_id = $request->section;

    print_r($request);

    /**
     * Sadly, I had to write a new class method to handle this DB transaction
     * ... When I updated the "catch all" query that brings in all information
     * it broke the application, and instead of debugging it, which I intend to do
     * I decided to adapt and write a new, simple method to remove a course from 
     * a schedule 4.21.21
     */
    $userSchedule = new UserSchedule();

    $result = $userSchedule->removeCourse($user_id, $schedule_id, $con);

    echo json_encode($response);
}
else
{
    echo json_encode("error");
}

?>