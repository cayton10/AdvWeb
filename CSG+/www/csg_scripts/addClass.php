<?php
require('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: *');

//Debugging
/*print_r($_POST);
print_r($_FILES);*/

//Instantiate required objects
$courseObj = new Course();
$instructorObj = new Instructor();
$sectionObj = new Section();

$fileName = '';
$courseID;
$instructorID;
$response;

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

//Load up all of our required course / class data
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



    //Check if the course is already in DB
    $course = $courseObj->getCourse($alpha, $number, $con);


/* --------------------- INSERT THE COURSE IF NONE EXISTS -------------------- */
    if($course->num_rows < 1) 
    {
        //Created class function to cut down on branching in this script
        $sql = $courseObj->addCourse($alpha, $number, $title, $fileName);

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Course added";
            $courseID = $con->insert_id;
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Add course failed";

            echo json_encode($response);
            exit();
        }
        
    }
    else //Get the course id for the section relation
    {
        $row = mysqli_fetch_assoc($course);
        $courseID = $row['course_id'];
    }

/* ---------------- ENTER THE INSTRUCTOR IF IT DOESN'T EXIST ---------------- */

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

    $instructor = $instructorObj->getInstructor($first, $last, $con);

    $instResp;
    //If instructor does not exist, add them
    if($instructor->num_rows < 1)
    {
        $instResp = $instructorObj->addInstructor($first, $last, $con);

        if($instResp['success'])
        {
            $instructorID = $instResp['instructorID'];
        }
        else
        {
            $response['success'] = false;
            $resposne['message'] = "Failed to add instructor";

            echo json_encode($response);
            exit();
        }
    }
    else //Need the instructor ID for adding info to course section
    {
        $row = mysqli_fetch_assoc($instructor);
        $instructorID = $row['instructor_id'];
    }

/* -------------------------------------------------------------------------- */
/*                            INSERT COURSE SECTION                           */
/* -------------------------------------------------------------------------- */

    //Check duplicate course section
    $checkSection = $sectionObj->getSection($section, $courseID, $con);
    //Handle appropriately based on result
    if($checkSection->num_rows < 1)
    {
        $section = $sectionObj->addSection($section, $courseID, $instructorID, $days, $start, $end, $con);
        if($section['success'])
        {
            $response['success'] = true;
            $response['message'] = "Course information added successfully";
            echo json_encode[$response];
            exit();
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Could not add section information. Contact admin";
            echo json_encode($response);
            exit();
        }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Course: $alpha $number - section: $section already exists. Use another section identifier, or check records.";
        echo json_encode($response);
        exit();
    }


    
}	

?>
