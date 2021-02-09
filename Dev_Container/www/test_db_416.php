<? 
     	$mysqli = new mysqli("dbServer", "my_user", "my_password", "userdb");

		 
     
	/* check connection */ 
     	if (mysqli_connect_errno()) 
     	{
		echo "Connect failed: " . mysqli_connect_error() . "<br />"; 
		exit(); 
     	}

		 
 
     	/* Create table and Insert rows */ 
     	if (!$mysqli->query("CREATE TABLE friends (id int, name varchar(20), 
           primary key(id))"))
		$mysqli->error;

     	if (!$mysqli->query("INSERT INTO friends VALUES (1,'Jen Lynn'), (2,  
          'Brian'),(3, 'Michael'), (4, 'Katherine'), (5, 'Alex'), (6, 'Drew'), 
          (7, 'Olivia')"))
		$mysqli->error;

		
     	/* select all rows */ 
     	$result = $mysqli->query("SELECT * FROM friends"); 
		 	 
     
	echo "Affected rows by (SELECT): " . $mysqli->affected_rows . "<br />";
     	while($row = $result->fetch_assoc()) 
          	echo stripslashes($row['name']) . "<br />";

			  
     
	/* close connection */ 
     	$mysqli->close(); 
?>
