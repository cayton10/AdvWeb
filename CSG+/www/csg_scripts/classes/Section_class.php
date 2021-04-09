<?

/* -------------------------------------------------------------------------- */
/*          COURSE SECTION CLASS TO TOUCH DB AND GET/SET SECTIONS             */
/* -------------------------------------------------------------------------- */
class Section
{
    public function __construct()
    {
        //Gotta have one
    }

    /**
     * Get course section and return assoc array - handle logic in addClass script
     */
    public function getSection($section, $courseId, $con)
    {
        $sql = "SELECT class_id FROM class
        WHERE section_num = '" . $section . "' AND course_id = '" . $courseId . "'";

        return(mysqli_query($con, $sql));
    }

    /**
     * getCourseSections(int, mysqli_connection_object)
     * Function retrieves all sections associated with particular class id *int*
     */
    public function getAllSections($courseId, $con)
    {
        $allSections = [];
        $sql= "SELECT class_id, section_num, class_days, class_start, class_end, instructor_first_name, instructor_last_name, course_syl 
                FROM class 
                LEFT JOIN instructor ON instructor.instructor_id = class.instructor_id 
                LEFT JOIN course ON course.course_id = class.course_id 
                WHERE class.course_id = $courseId";

        //prep stmt
        $stmt = $con->prepare($sql);

        $stmt->execute();

        $stmt->store_result();

        if($stmt->num_rows == 0)
        {
            $allSections['success'] = false;
            $allSections['message'] = "No sections for this course";
        }
        else
        {
            $stmt->bind_result($class_id, $section_num, $class_days, $class_start, $class_end, $first, $last, $syl);
            while($stmt->fetch())
            {
                //Define index variables and assign
                //Dump course table info into array for JSON output
                $allSections[] = array("class_id" => $class_id,
                                    "section_num" => $section_num,
                                    "class_days" => $class_days,
                                    "class_start" => $class_start,
                                    "class_end" => $class_end,
                                    "instructor_first_name" => $first,
                                    "instructor_last_name" => $last,
                                    "class_end" => $class_end,
                                    "course_syl" => $syl);
            }
        }
        return($allSections);
    }
    
    public function addSection($section, $courseId, $instId, $days, $start, $end, $con)
    {
        $response = [];
        $sql = "INSERT INTO `class`
            (`section_num`, `course_id`, `instructor_id`, `class_days`, `class_start`, `class_end`)
            VALUES
            ('{$section}', '{$courseId}', '{$instId}', '{$days}', '{$start}', '{$end}' )";

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Course section added";
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Failed to add course section";
        }

        return($response);
    }
}



?>