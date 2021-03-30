<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//must decode the json format we're receiving & get input
$request = json_decode(file_get_contents('php://input'));

if(isset($request) && !empty($request))
{
	
	//see the array we're working with in the networking tools
	//print_r($request);

	//Sanitize
	$email = $request->email;
    $email = htmlspecialchars(stripslashes($email));
    $password = $request->password;
	$password = md5(htmlspecialchars(stripslashes(($password))));
	
	$sql = "SELECT first_name, is_admin, user_id
             FROM `user` WHERE `email` = '" . $email . "' AND `password` = '" . $password . "'";

    $result = mysqli_query($con, $sql);
    
    $row = mysqli_fetch_assoc($result);

    echo $json = json_encode($row);

    exit;
}

?>