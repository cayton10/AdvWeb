
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

    public function getCourse($alp, $num, $con)
    {

        $sql = "SELECT course_id FROM course
        WHERE course_alpha = '" . $alp . "' AND course_num = '" . $num . "'";

        return(mysqli_query($con, $sql));
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