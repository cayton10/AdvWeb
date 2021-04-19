<?php
    require('config.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header('Access-Control-Allow-Headers: *');

    //Instantiate an object of user class
    $user = new User();

    //Get all users
    $users = $user->getAllUsers($con);

    if(!$users)
    {
        $response = [];
        $response['success'] = false;
        $response['message'] = "Could not retrieve users from DB";
        echo json_encode($response);
        exit();
    }

    echo json_encode($users);

?>