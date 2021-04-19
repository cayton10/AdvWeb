<?

/* -------------------------------------------------------------------------- */
/*                  USER CLASS FOR TOUCHING USER TABLE IN DB                  */
/* -------------------------------------------------------------------------- */
class User
{
    public function construct()
    {
        //Required
    }

    /**
     * getAllUsers(mysqli_connection)
     * Takes a myslqli connection object and returns a list of all users
     */
    public function getAllUsers($con)
    {
        $sql = "SELECT user_id, first_name, last_name
                FROM user WHERE is_admin = 0
                ORDER BY last_name, first_name";

        $stmt = $con->prepare($sql);
        $stmt->execute();
        $stmt->store_result();

        if($stmt->num_rows == 0)
        {
            return false;
        }

        $stmt->bind_result($user_id, $first_name, $last_name);
        while($stmt->fetch())
        {

            $users[] = array(
                "user_id" => $user_id,
                "first_name" => $first_name,
                "last_name" => $last_name
            );
        }

        return $users;
    }
}
?>