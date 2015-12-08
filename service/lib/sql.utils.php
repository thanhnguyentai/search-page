<?php
	include 'config.php';
	include 'utils.php';

	class SQL_UTILS_MESSAGE{
		const COULD_NOT_CONNECT_TO_SERVER = "Could not connect to server.";
		const COULD_NOT_SELECT_DATABASE = "Could not select database.";
	}

	class SqlUtils{
		protected $db_config = array();
		
		function __construct($db_config = array()) {
			if (count($db_config) == 0){
				global $GLOBALS;
				$db_config = $GLOBALS['DB'];
			}
			$this->db_config = $db_config;
		}
		public function getConnection()
		{
			if(!isset($this->conn)){
				$host = $this->db_config['HOST'];
				$dbname = $this->db_config['DATABASE'];
				$username = $this->db_config['USER'];
				$password = $this->db_config['PASSWORD'];
				$this->conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
			}
			return $this->conn;
	    }


		public function getRows($sql){
			$conn = $this->getConnection();
			$rows = array();
			
			$q = $conn->query($sql);
			$q->setFetchMode(PDO::FETCH_ASSOC);
			while ($r = $q->fetch()){
				$rows[] = $r;
			}
			return $rows;
		}
	}

?>
