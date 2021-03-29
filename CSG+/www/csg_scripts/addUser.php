<?php
require_once('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');


//must decode the json format we're receiving & get input
$request = json_decode(file_get_contents('php://input'));


if(isset($request) && !empty($request))
{
	
	//see the array we're working with in the networking tools
	// print_r($request);

	//Sanitize
	$first_name = $request->first_name;
	$last_name = $request->last_name;
	$email = $request->email;
    $password = $request->password;
	$password = md5($password);
    $is_Admin = 0;


	
	$sql = "INSERT INTO `user` 
	(
	`first_name`,
	`last_name`,
    `password`,
	`email`,
    `is_admin`,
	) VALUES
	(
	'{$first_name}',
	'{$last_name}',
	'{$email}',
	'{$password}',
	'{$is_Admin}',
	)
	";

	if(mysqli_query($con,$sql))
	{
		http_response_code(201);
	}
	else
	{
		http_response_code(422);
	}

}

?>
