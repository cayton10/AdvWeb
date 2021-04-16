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
        $courseId = $request;

        //Instantiate Course obj and pull back all courses
        $sectionObj = new Section();

        $sections = $sectionObj->getAllSections($courseId, $con);

        echo json_encode($sections);
    }
    else
    {
        $response = [];
        $response['success'] = false;
        $response['message'] = "No request set";
        echo json_encode($response);
    }

?>