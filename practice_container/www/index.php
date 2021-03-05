<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LAMP STACK</title>
        <link rel="stylesheet" href="/assets/css/bulma.min.css">
    </head>
    <body>
        <section class="hero is-medium is-info is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        ADVANCED WEB
                    </h1>
                    <h2 class="subtitle">
                        Local Development LAMP Stack w/ React Support
                    </h2>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <h3 class="title is-3 has-text-centered">Environment</h3>
                        <hr>
                        <div class="content">
                            <ul>
                                <li><?= apache_get_version(); ?></li>
                                <li>PHP <?= phpversion(); ?></li>
                                <li>
                                    <?php
                                    $link = mysqli_connect("database", "root", $_ENV['MYSQL_ROOT_PASSWORD'], null);

/* check connection */
                                    if (mysqli_connect_errno()) {
                                        printf("MySQL connecttion failed: %s", mysqli_connect_error());
                                    } else {
                                        /* print server version */
                                        printf("MySQL Server %s", mysqli_get_server_info($link));
                                    }
                                    /* close connection */
                                    mysqli_close($link);
                                    ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="column">
                        <h3 class="title is-3 has-text-centered">Quick Links</h3>
                        <hr>
                        <div class="content">
                            <ul>
                                <li><a href="/phpinfo.php">phpinfo()</a></li>
                                <li><a href="http://localhost:<? print $_ENV['PMA_PORT']; ?>">phpMyAdmin</a></li>
                                <li><a href="/test_db.php">Test DB Connection with mysqli</a></li>
                                <li><a href="/test_db_pdo.php">Test DB Connection with PDO</a></li>
                                <li><a href="/test_db_416.php">Test DB: Brian's Code</a></li>
                                <li><a href="http://localhost:3000">Test React Project</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class='column'>
                        <h3 class='title is-3 has-text-centered'>Projects</h3>
                        <hr>
                        <div class='content'>
                            <ul>
                                <?
                                    define("PROJECTS", __DIR__ . '/Projects');

                                    //Return the difference of arrays between what is scanned and what is specified
                                    //Linux environment directories include '.' and '..' as directories in this structure
                                    //That's why this is there... to omit them.
                                    $projectList = array_diff(scandir(PROJECTS), array('..', '.'));
                                    
                                    $linkOutput = "";
                                    //Process the names of the projects and output as links to each site
                                    foreach($projectList as $project)
                                    {
                                       
                                        $linkOutput .= "<li><a href='/Projects/" . $project . "'>" . $project . "</a></li>";
                                    }

                                    echo $linkOutput;

                                    echo "<br/>" . $_ENV['REACT_PROJECT'];
                                    
                                    
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
</html>