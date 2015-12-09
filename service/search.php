<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	include 'get.php';
	
	$result	= array();
	$query = str_replace("\""," ",getParam('query'));
	$query = str_replace("'"," ",$query);
	$query	= strtolower(standardlizeString($query));
	
	if(strlen($query) > 0){
		$sqlUtil	= new SqlUtils();
		$sqlStr = "SELECT Name,Town,State,State_Abbrev,Zip,Code,Icon,URL FROM Data WHERE";
			  
		$queryData 	= explode(' ', $query);
		if(count($queryData) > 0){
			// CHECK Name
			$sqlStr .= "(";
			for($i=0;$i<count($queryData);$i++){
				$sqlStr .= "LOWER(Name) LIKE '%".$queryData[$i]."%'";
				if($i < count($queryData) - 1){
					$sqlStr .= " OR ";
				}
			}
			$sqlStr .= ") OR ";
			
			// CHECK Town
			$sqlStr .= "(";
			for($i=0;$i<count($queryData);$i++){
				$sqlStr .= "LOWER(Town) LIKE '%".$queryData[$i]."%'";
				if($i < count($queryData) - 1){
					$sqlStr .= " OR ";
				}
			}
			$sqlStr .= ") OR ";
			
			// CHECK Zip
			$sqlStr .= "(";
			for($i=0;$i<count($queryData);$i++){
				$sqlStr .= "Zip LIKE '%".$queryData[$i]."%'";
				if($i < count($queryData) - 1){
					$sqlStr .= " OR ";
				}
			}
			$sqlStr .= ")";
			
			// GET data
			$rows 	= $sqlUtil->getRows($sqlStr);
			if(count($rows) > 0){
				$aStore = array();
				for($i=0;$i<count($rows);$i++){
					$aStore['Name'] = $rows[$i]['Name'];
					$aStore['Town'] = $rows[$i]['Town'];
					$aStore['State'] = $rows[$i]['State'];
					$aStore['State_Abbrev'] = $rows[$i]['State_Abbrev'];
					$aStore['Zip'] = $rows[$i]['Zip'];
					$aStore['Code'] = $rows[$i]['Code'];
					$aStore['Icon'] = $rows[$i]['Icon'];
					$aStore['URL'] = $rows[$i]['URL'];
					
					$result[] = $aStore;
				}
			}
		}
	}
 	 
	echo json_encode($result);
?>