<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');


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
	`user_id`
	`email`,
	`first_name`,
    `last_name`,
	`password`,
    `is_admin`,
	) VALUES
	(
	'{$email}',
	'{$first_name}',
	'{$last_name}',
	'{$password}',
	'{$is_Admin}',
	)
	";

	if(mysqli_query($con,$sql))
	{
		http_response_code(201);

		$result['data'] = mysqli_affected_rows($con);
		$mysqli->close();
		echo json_encode($result);
	}
	else
	{
		http_response_code(422);
	}

}

?>
