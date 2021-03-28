<?php
require_once("../config/csg_config.php");

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
    $password = md5($request->password);
    $is_Admin = $request->is_Admin;

	//Store
	$sql = "INSERT INTO `students` 
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
	'{$email}'
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
