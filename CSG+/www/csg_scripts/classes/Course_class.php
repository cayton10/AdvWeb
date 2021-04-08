
<?

/* -------------------------------------------------------------------------- */
/*           COURSE CLASS TO TOUCH DATABASE WITH GET / SET FUNCTIONS          */
/* -------------------------------------------------------------------------- */

class Course
{
    public function __construct()
    {
        //Just need the constructor to build our blank object   
    }


    /**
     * getCourse(string, int, mysqliConnection)
     * Returns single course based on course alpha and number
     */
    public function getCourse($alp, $num, $con)
    {

        $sql = "SELECT course_id FROM course
        WHERE course_alpha = '" . $alp . "' AND course_num = '" . $num . "'";

        return(mysqli_query($con, $sql));
    }

    /**
     * getAllCourses(mysqliConnection)
     * Returns all fields and rows of data in course table
     */
    public function getAllCourses($con)
    {
        $sql = "SELECT * FROM course ORDER BY course_alpha, course_num";

        //prep stmt
        $stmt = $con->prepare($sql);

        $stmt->execute();

        $stmt->store_result();

        if($stmt->num_rows == 0)
        {
            $allCourses['success'] = false;
            $allCourses['message'] = "No courses to load";
        }
        else
        {
            $stmt->bind_result($courseID, $courseAlpha, $courseNum, $courseTitle, $courseSyllabus);
            while($stmt->fetch())
            {
                //Define index variables and assign
                //Dump course table info into array for JSON output
                $allCourses[] = array("course_id" => $courseID,
                                    "course_alpha" => $courseAlpha,
                                    "course_num" => $courseNum,
                                    "course_title" => $courseTitle,
                                    "course_syl" => $courseSyllabus);
            }
        }

        return($allCourses);
    }

    public function addCourse($alp, $num, $title, $syl)
    {
        $sql = '';

        if($syl === '')
        {
            $sql = "INSERT INTO `course`
            (`course_alpha`, `course_num`, `course_title`)
            VALUES
            ('{$alp}','{$num}','{$title}')";
        } else { //Construct if a syllabus is sent

            $sql = "INSERT INTO `course`
            (`course_alpha`,
            `course_num`,
            `course_title`,
            `course_syl`)
            VALUES
            ('{$alp}',
            '{$num}',
            '{$title}',
            '{$syl}')";
        }

        return($sql);
    }


}
?>