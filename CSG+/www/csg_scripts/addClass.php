<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//Debugging
print_r($_POST);
print_r($_FILES);

if(!empty($_FILES))
{
    echo "WE HAVE A FILE";
    //Define parth parts as path info for sent file so.....
    $path_parts = pathinfo($_FILES['file']['name']);
    //We can use the 'extension' key to get the file's extension type
    $extension = $path_parts['extension'];


    //Build the filename we'll store in the syllabi repo
    $fileName = $_POST['alpha'] . $_POST['number'] . "." . $extension;

    //Move the file to the syllabi repo
    $success = move_uploaded_file($_FILES['file']['tmp_name'], "../syllabi/" . $fileName);
}




/*if(isset($request) && !empty($request))
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
	`email`,
	`first_name`,
    `last_name`,
	`password`,
    `is_admin`
	) VALUES
	(
	'{$email}',
	'{$first_name}',
	'{$last_name}',
	'{$password}',
	'{$is_Admin}'
	)
	";

	

	if(mysqli_query($con,$sql))
	{
		http_response_code(201);
		//Store user id so we can put in localstorage after registration
		$result['user'] = $con->insert_id;

		echo json_encode($result);
	}
	else
	{
		http_response_code(422);
	}
    
}
*/

?>
