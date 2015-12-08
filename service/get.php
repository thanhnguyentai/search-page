<?php
	include_once "lib/sql.utils.php";
	
	function getParam($param){
		if(isset($_GET[$param])){
			return $_GET[$param];
		}else if(isset($_POST[$param])){
			return $_POST[$param];
		}else{
			return NULL;
		}
	}
?>
