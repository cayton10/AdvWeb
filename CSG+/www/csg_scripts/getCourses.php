<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

    //Instantiate Course obj and pull back all courses
    $courseObj = new Course();

    $courses = $courseObj->getAllCourses($con);

    

    echo json_encode($courses);

?>