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
     * getSchedule(int, mysqli_obj)
     * Takes user id argument and returns all class / course information
     * associated with user's favorited course sections
     */
    public function getUserSchedule($user_id, $con)
    {
        //Construct statement
        $sql = "SELECT schedule_id,
                        course_title, 
                        course_alpha,   
                        course_num,
                        instructor_first_name,
                        instructor_last_name,
                        class_start,
                        class_end,
                        class_days,
                        course_syl,
                        section_num 

                FROM schedule
                LEFT JOIN class ON class.class_id = schedule.class_id
                LEFT JOIN course ON course.course_id = class.course_id
                LEFT JOIN instructor ON instructor.instructor_id = class.instructor_id
                WHERE user_id = $user_id
                ORDER BY class_start, class_days";
        
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $stmt->store_result();

        //Bind the results and return them
        if($stmt->num_rows == 0)
        {
            return 0;
        }
        else
        {
            $stmt->bind_result($schedule_id, $course_title, $course_alpha, $course_num, $instructor_first_name, $instructor_last_name, $class_start, $class_end, $class_days, $course_syl, $section_num);
            while($stmt->fetch())
            {
                //Dump all bound vars into schedule array review for JSON output
                $schedule[] = array(
                    "schedule_id" => $schedule_id,
                    "course_title" => $course_title,
                    "course_alpha" => $course_alpha,
                    "course_num" => $course_num,
                    "instructor_first_name" => $instructor_first_name,
                    "instructor_last_name" => $instructor_last_name,
                    "class_start" => $class_start,
                    "class_end" => $class_end,
                    "class_days" => $class_days,
                    "course_syl" => $course_syl,
                    "section_num" => $section_num
                );
            }
            //Return the array back to the script that called it
            return $schedule;
        }

    }

    /**
     * Check to make sure the user doesn't already have a schedule containing
     * the course they just "favorited"
     * Returns bool
     */
    public function checkCourseDup($user_id, $course_id, $con)
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

    /**
     * updateSchedule(int, int, mysqli_object)
     * Updates user schedule with new class id for existing course
     */
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

    /**
     * removeClass(int, int, mysqli_object)
     * Removes class section from users schedule
     */
    public function removeClass($class_id, $user_id, $con)
    {
        $response = [];

        $sql = "DELETE FROM `schedule`
                WHERE `class_id` = '$class_id' AND `user_id` = '$user_id'";

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Section removed from schedule.";
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Section could not be removed from schedule.";
        }

        return $response;
    }

    /**
     * removeCourse(int, int, mysqli_object)
     * Only writing this because polymorphism - retroactively broke my app.
     * Will fix soon and nix this needless method
     */
    public function removeCourse($user_id, $schedule_id, $con)
    {
        $response = [];

        $sql = "DELETE FROM `schedule`
                WHERE `schedule_id` = '$schedule_id' AND `user_id` = '$user_id'";

        if(mysqli_query($con, $sql))
        {
            $response['success'] = true;
            $response['message'] = "Course section deleted from user schedule";
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Could not delete course from user schedule";
        }

        return $response;
    }
}
?>
