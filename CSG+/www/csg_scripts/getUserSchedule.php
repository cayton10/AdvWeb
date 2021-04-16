<?php
    require('config.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header('Access-Control-Allow-Headers: *');


    //Pull down our sent course id
    //must decode the json format we're receiving & get input
    $request = json_decode(file_get_contents('php://input'));

    if(isset($request) && !empty($request))
    {
        $userID = $request;

        //Instantiate Course obj and pull back all courses
        $userSched = new UserSchedule();

        $sections = $userSched->getUserSchedule($userID, $con);

        echo json_encode($sections);
    }
    else
    {
        $response = [];
        $response['success'] = false;
        $response['message'] = "Error bringing up schedules.";
        echo json_encode($response);
    }

?>