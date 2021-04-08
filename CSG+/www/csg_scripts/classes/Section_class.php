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

    public function addSection($section, $courseId, $instId, $days, $start, $end, $con)
    {
        $response = [];
        $sql = "INSERT INTO `class`
            (`section_num`, `course_id`, `instructor_id`, `class_days`, `class_start`, `class_end`)
            VALUES
            ('{$section}', '{$courseId}', '{$instId}', '{$days}', '{$start}', '{$end}' )";
        echo $sql;

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