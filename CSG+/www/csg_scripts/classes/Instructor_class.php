<?

/* -------------------------------------------------------------------------- */
/*            INSTRUCTOR CLASS TO TOUCH DB AND GET/SET INSTRUCTORS            */
/* -------------------------------------------------------------------------- */
class Instructor
{
    public function __construct()
    {
        //Gotta have one
    }

    public function getInstructor($first, $last, $con)
    {
        $sql = "SELECT instructor_id FROM instructor
                            WHERE instructor_first_name = '" . $first . "' AND instructor_last_name = '" . $last . "'";

        return(mysqli_query($con, $sql));

    }

    public function addInstructor($first, $last, $con)
    {
        $response = [];

        $sql = "INSERT INTO `instructor`
            (`instructor_first_name`,`instructor_last_name`)
            VALUES
            ('{$first}','{$last}')";


        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Instructor Added";
            $response['instructorID'] = $con->insert_id;
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Add instructor failed";
        }

        return($response);
    }
}

?>