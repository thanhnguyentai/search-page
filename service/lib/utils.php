<?php
	$DEBUG = false;

	function debug_msg($message) {
		global $DEBUG;
		if (isset($DEBUG) && $DEBUG) echo $message;
	}

	function standardlizeString($str) {
		$i=0;
		$temp = $str;
		while($i<strlen($temp)){
			if($temp[$i] == ' ' && ($i == 0 || $i == strlen($temp)-1 || $temp[$i+1]== ' ')){
				if($i==0){
					$temp = substr($temp,1);
				} 
				else if($i == strlen($temp)-1){
					$temp = substr($temp,0,strlen($temp)-1);
				}
				else{
					$temp = substr($temp,0,$i).substr($temp,$i+1);
				}
			}
			else{
				$i++;
			}
		}
		
		return $temp;
	}
?>
