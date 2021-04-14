<?
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//must decode the json format we're receiving & get input
$request = json_decode(file_get_contents('php://input'));

if(isset($request) && !empty($request))
{
    print_r($request);

    $response = [];

    //Sanitize
    $courseID = $request->course;
    $userID = $request->user;
    $classID = $request->favorite;

    $schedule = new UserSchedule();

    //Check for duplicate course
    $duplicate = $schedule->checkCourseDup($userID, $courseID, $classID, $con);
    //Update or add course logic
    if($duplicate == 0)
    {
        echo json_encode("Not a duplicate");
        $addSection = $schedule->addClassToSchedule($classID, $userID, $con);

        echo json_encode($addSection);
    }
    //Logic for schedule add / update
    else
    {
        //Grab the schedule id that has the duplicate course
        $scheduleID = $duplicate[0]['schedule_id'];
        //Update the schedule with the new class
        $update = $schedule->updateSchedule($scheduleID, $classID, $con);
        echo json_encode($update);
    }
    
}
?>