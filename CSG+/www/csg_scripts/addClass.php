<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//Debugging
/*print_r($_POST);
print_r($_FILES);*/

$fileName = '';
$courseID;
$response ;

if(!empty($_FILES))
{
    //Define parth parts as path info for sent file so.....
    $path_parts = pathinfo($_FILES['file']['name']);
    //We can use the 'extension' key to get the file's extension type
    $extension = $path_parts['extension'];
    //Build the filename we'll store in the syllabi repo
    $fileName = $_POST['alpha'] . $_POST['number'] . "." . $extension;

    //Move the file to the syllabi repo
    $success = move_uploaded_file($_FILES['file']['tmp_name'], "./syllabi/" . $fileName);
}




if(isset($_POST) && !empty($_POST))
{
    //Sanitize and prep
    $alpha = htmlspecialchars(trim(stripslashes($_POST['alpha'])));
    $number = htmlspecialchars(trim(stripslashes($_POST['number'])));
    $title = htmlspecialchars(trim(stripslashes($_POST['title'])));
    $section = htmlspecialchars(trim(stripslashes($_POST['section'])));
    $instructor = htmlspecialchars(trim(stripslashes($_POST['instructor'])));
    $start = htmlspecialchars(trim(stripslashes($_POST['start'])));
    $end = htmlspecialchars(trim(stripslashes($_POST['end'])));
    $days = htmlspecialchars(trim(stripslashes($_POST['days'])));


    //If course isn't already in course table, add it, else grab the id for section relation
    $selectCourse = "SELECT course_id FROM course
                    WHERE course_alpha = '" . $alpha . "' AND course_num = '" . $number . "'";

    $course = mysqli_query($con, $selectCourse);
    print_r($course);

/* --------------------- INSERT THE COURSE IN NONE EXISTS -------------------- */
    if($course->num_rows < 1) 
    {
        $sql = '';

        //Construct query w/ no syllabus
        if($fileName === '')
        {
            $sql = "INSERT INTO `course`
            (`course_alpha`,`course_num`,`course_title`)
            VALUES
            (`{$alpha}`,`{$number}`,`{$title}`)";

        } else { //Construct if a syllabus is sent

            $sql = "INSERT INTO `course`
            (`course_alpha`,`course_num`,`course_title`,`course_syl`)
            VALUES
            (`{$alpha}`,`{$number}`,`{$title}`,`{$fileName}`)";
        }

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['course'] = "Course added";
            $courseID = $con->insert_id;
        }
        else
        {
            $response['success'] = false;
            $response['course'] = "Add course failed";

            echo_json_response($response);
            exit();
        }
        
    }
    else //Get the course id for the section relation
    {
        $row = mysqli_fetch_assoc($course);
        $courseID = $row['course_id'];
    }

    //Query the db for the instructor sent via axios and add if null
    //Get the first and last name of instructor because I forgot to add a first and
    //Last name field
    $names = explode(" ", $instructor);

    $first = $names[0];
    $last;
    if(!empty($names[1]))
    {
        $last = $names[1];
    }


/* -------------------------------------------------------------------------- */
/*                            INSERT COURSE SECTION                           */
/* -------------------------------------------------------------------------- */

    /*$insertSection = "INSERT INTO `class`
    (
        `course_id`,
        "*/
}	
/*
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
