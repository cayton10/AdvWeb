<?

/* -------------------------------------------------------------------------- */
/*                  SCHEDULE CLASS FOR GETTING USER SCHEDULES                 */
/* -------------------------------------------------------------------------- */
class UserSchedule
{

    public function __construct()
    {
        //Empty constructor
    }

    /**
     * Check to make sure the user doesn't already have a schedule containing
     * the course they just "favorited"
     * Returns bool
     */
    public function checkCourseDup($user_id, $course_id, $class_id, $con)
    {
        //Construct statement
        $sql = "SELECT schedule_id
                FROM schedule
                LEFT JOIN class ON class.class_id = schedule.class_id
                LEFT JOIN course ON course.course_id = class.course_id
                WHERE schedule.user_id = $user_id 
                    AND course.course_id = $course_id";

        //Prep
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $stmt->store_result();

        //If no returned result, then 
        if($stmt->num_rows == 0)
        {
            return 0;
        }
        else //Else the section has been favorited already
        {
            $stmt->bind_result($schedule_id);
            while($stmt->fetch())
            {
                //Define index variables and assign
                //Dump course table info into array for JSON output
                $scheduleSection[] = array("schedule_id" => $schedule_id);
            }
            return $scheduleSection;
        }
    }

    /**
     * addClassToSchedule($int, $int, msqli_object)
     * Function takes the class id for the specific section the user wants
     * as well as their user id to relate to user table
     */
    public function addClassToSchedule($class_id, $user_id, $con)
    {
        $response = [];

        $sql = "INSERT INTO `schedule`
        (
            `class_id`,
            `user_id`
        ) VALUES
        (
            '{$class_id}',
            '{$user_id}'
        )";

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Course section added to schedule";
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Course section could not be added to schedule";
        }

        return $response;
    }

    public function updateSchedule($schedule_id, $class_id, $con)
    {
        $response = [];

        $sql = "UPDATE `schedule` SET `class_id` = '$class_id'
                WHERE `schedule_id` = '$schedule_id' LIMIT 1";


        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Schedule updated";
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Failed to update schedule";
        }
        return($response);
    }
}
?>
