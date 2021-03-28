<? 
    //CREATE DB CONNECTION 
    define('DB_HOST', 'dbServer');
    define('DB_USER', 'csg_user');
    define('DB_PASS', 'csg_Pa$$word');
    define('DB_NAME', 'csgdb');
    define( 'SEND_ERRORS_TO', 'cayton10@marshall.edu' ); //set email notification email address
    define( 'DISPLAY_DEBUG', true ); //display db errors?
    define( 'BASEDIR', $_SERVER['DOCUMENT_ROOT'] . "\\csg_scripts\\");

    // connect to database
    function connect()
    {
        $connect=mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if(mysqli_connect_errno($connect))
        {
            die("Failed to connect" . mysqli_connect_errno());
        }


        mysqli_set_charset($connect, "utf8");

        return $connect;
    }

    $con = connect();
    /**
     * Will have to see if classes are even necessary for this project
     */
    //define( 'PATH_TO_CLASSES',  $_SERVER['DOCUMENT_ROOT'] . '/CIT410/cayton10/EComm/classes/');
    // PHP 7 way to do autoload
    //spl_autoload_register(function ($class) {
    //include PATH_TO_CLASSES . $class . '_class.php';
    //});

?>