<?php
error_reporting(0);
/**
 * Aqui estão as funcoes usadas para processar a consulta na base de dados e a resposta obitda.
 */

/**
 * Faz um parse dos caracteres de escape do postgis para os escapes aceitos pelo formato json.
 * @param string $value  String com os dados a serem processados 
 * @return string        Retona a string no com os escapes aceitos pelo json.
 */
function escapeJsonString($value) { 
	$escapers = array("\\", "/", "\"", "\n", "\r", "\t", "\x08", "\x0c");
	$replacements = array("\\\\", "\\/", "\\\"", "\\n", "\\r", "\\t", "\\f", "\\b");
	$result = str_replace($escapers, $replacements, $value);
	return $result;
}

/**
 * Faz um pre processamenteo da consulta. Substituindo a coluna geometrica na clausula "select" por funcão 
 * que calcula o tipo de geometria e ainda adiciona a funcão que retorna as coordenadas da geometria a no formato
 * geojson.
 * @param string $strConsulta     	String com a consulta entrada pelo usuario.
 * @param string $colGeometrica    	Nome da coluna com a geometria
 * @return string                 	Retorna a consulta ja processada.
 */
function reformularGeoConsulta($strConsulta, $colGeometrica){
	//retira possiveis caracteres de escape que o postgres não aceita e subistitui por espaço
	//$procura = array("\\", "/", "\n", "\r", "\t", "\x08", "\x0c");
	$procura = array("\\", "\n", "\r", "\t", "\x08", "\x0c");
	$substit = ' ';
	$result = str_replace($procura, $substit, $strConsulta);
	
	//separa palavra grudass com uma virgula.
	$proc = array(',');
	$subst = ' , ';
	$result2 = str_replace($proc, $subst, $result);
	
	$keyProc = 0;
	$arrayResult = explode(' ', $result2);
	$keyProc = array_search('*', $arrayResult);
	
	if($keyProc != 0){
		$subst = pg_escape_string('*') . ', ST_GeometryType('. $colGeometrica . ') AS Geometria, ST_AsGeoJSON ('. $colGeometrica.') AS geojson';
		$arrayResult[$keyProc] = $subst;
		$resultf = implode(' ', $arrayResult);
		return $resultf;
	} else{

	//subistitui a primeira ocorrencia da coluna "geom" por uma funcão que retorna o tipo da geometria
	//Adiciona a funcão que calcula as cordenada no formato geojsom.
	$arrayResult3 = explode(" ", $result2);
	
	//$keyProc = array_search($colGeometrica, $arrayResult3);
	$i = 0;
	$keyProc =  -1;
	while (strnatcasecmp ( $arrayResult3 [$i], 'from' ) != 0 ){
		if(stripos($arrayResult3 [$i], '.' . $colGeometrica) !== FALSE){
			$keyProc = $i;
			break;
		}
		if($arrayResult3[$i] == $colGeometrica){
			$keyProc = $i;
			break;
		}
		$i++;
	}
	if($keyProc != -1){
	$subst = " ST_GeometryType(". $arrayResult3 [$keyProc] . ") as Geometria, ST_AsGeoJSON (". $arrayResult3 [$keyProc].") AS geojson";
	$arrayResult3[$keyProc] = $subst;
	$resultf = implode(" ", $arrayResult3);
	}
	return $resultf;
	}
}

/**
 * Faz um pre processamenteo da consulta retirando caracteres invalidos para o postgres.
 * @param string $strConsulta		String com a consulta entrada pelo usuario.
 * @return string					Retorna a consulta ja processada.
 */
function reformularConsulta($strConsulta){
	//retira possiveis caracteres de escape que o postgres não aceita e subistitui por espaço
	//$procura = array("\\", "/", "\n", "\r", "\t", "\x08", "\x0c");
	$procura = array("\\", "\n", "\r", "\t", "\x08", "\x0c");
	$substit = "  ";
	$result = str_replace($procura, $substit, $strConsulta);
	
	return $result;
}


function retornarTabelasGeometrica($conexao){
	$sqlConsult = "select f_table_name, f_geometry_column, type from geometry_columns";
	$result = pg_query($conexao, $sqlConsult);
	return $result;
}

/**
 * Testa se existe uma tabela geometrica na consulta
 * @param unknown $tabelaGeom
 * @param unknown $consulta
 * @return boolean
 */
function temTabelaGeometria($tabelaGeom, $consulta){
	$contLinhas = pg_num_rows ( $tabelaGeom );
	$row = pg_fetch_row ( $tabelaGeom, 0 );
	$arrayResult = explode ( ' ', $consulta );
	$procuraFrom = 0;
	$procuraWhere = 0;
	$temgeom = FALSE;
	
	for($i = 0; $i < count($arrayResult); $i ++) {
		if (strnatcasecmp ( $arrayResult [$i], 'from' ) == 0) {
			$procuraFrom = $i;
				
			break;
		}
	}
	// echo "toma qui ". $procuraFrom;

	for($i = 0; $i < count($arrayResult); $i ++) {
		if (strnatcasecmp ( $arrayResult [$i], 'where' ) == 0) {
			$procuraWhere = $i;
			break;
		}
	}

	if ($procuraWhere == 0) {
		$procuraWhere = count ( $arrayResult );
	}

	// echo ">>>aqui: ". $procuraWhere . " from".$procuraFrom;
	//print_r($arrayResult);
	//echo '<br/>';
	//echo phpinfo ();
	//echo '<br />';
	for($i = $procuraFrom; $i < $procuraWhere; $i ++) {
		// echo $arrayResult[$i] . ">>>><><>lo".$contLinhas;
		for($j = 0; $j < $contLinhas; $j ++) {
			$row = pg_fetch_row ( $tabelaGeom, $j );
			// echo $row[0];
			if (stripos($arrayResult [$i], $row [0]) !== FALSE) {
				$temgeom = TRUE;
				// echo "foiii>>>>" ;
			}
		}
	}

	return $temgeom;
}


/**
 * Funcão que faz uma consulta geografica na base de dados
 * @param string $strConsulta  		Consulta a ser realizada na base
 * @param int $conexao         		Um recurso necessario para fazer a conexão com a base
 * @param string $colGeometrica		Nome da coluna geometrica na base de dados.
 * @return resource			   		Resultado da consulta sql.
 */
function consultarGeoBase($strConsulta, $colGeometrica, $conexao){
	
	$consulta = reformularGeoConsulta($strConsulta, $colGeometrica);
	$result = pg_query($conexao, $consulta);
	if (!$result) {
		echo "4Erro na consulta sql. Reveja a consulta.<br>" . $strConsulta ."<br>". $consulta;
		exit;
	}
	return $result;
}

/**
 * Função que faz uma consulta sem estenções espaciais na base de dados.
 * @param string $strConsulta		Consulta a ser realizada na base
 * @param string $conexao			Um recurso necessario para fazer a conexão com a base
 * @return resource					Resultado da consulta sql.
 */
function consultarBase($strConsulta, $conexao){
	$consulta = reformularConsulta($strConsulta);
	$result = pg_query($conexao, $consulta);
	if (!$result) {
		echo "1Erro na consulta sql. Reveja a consulta<br>" . $strConsulta ."<br>". $consulta;
		exit;
	}
	return $result;
}



/**
 * Funcão que resebe o resultado do postgis e o devolve no formato do GeoJson.
 * @param resource $result		Resultado do Postgis.
 * @return resource				Resultado em formato GeoJSON.
 */
// function postgisToGeojson($result){
// 	$output    = '';
// 	$rowOutput = '';
	
// 	while ($row = pg_fetch_assoc($result)) {
// 		$rowOutput = (strlen($rowOutput) > 0 ? ',' : '') . '{"type": "Feature", "geometry": ' . $row['geojson'] . ', "properties": {';
// 		$props = '';
// 		$id    = '';
// 		foreach ($row as $key => $val) {
// 			if (($key != "geojson") && ($key != "geom")) {
// 				$props .= (strlen($props) > 0 ? ',' : '') . '"' . $key . '":"' . escapeJsonString($val) . '"';
// 			}
// 			if ($key == "id") {
// 				$id .= ',"id":"' . escapeJsonString($val) . '"';
// 			}
// 		}
	
// 		$rowOutput .= $props . '}';
// 		$rowOutput .= $id;
// 		$rowOutput .= '}';
// 		$output .= $rowOutput;
// 	}
	
// 	$output = '{ "type": "FeatureCollection", "features": [ ' . $output . ' ]}';
// 	return $output;
	
// }


function postgisToGeojson($result){
	$output    = '';
	$rowOutput = '';

	while ($row = pg_fetch_assoc($result)) {
		if ($row['geojson'] == null){
		$rowOutput = (strlen($rowOutput) > 0 ? ',' : '') . '{"type": "Feature", "geometry": null' . ', "properties": {';
		}
		else{
			$rowOutput = (strlen($rowOutput) > 0 ? ',' : '') . '{"type": "Feature", "geometry": ' . $row['geojson'] . ', "properties": {';
		}
		$props = '';
		$id    = '';
		foreach ($row as $key => $val) {
			if (($key != "geojson") && ($key != "geom")) {
				$props .= (strlen($props) > 0 ? ',' : '') . '"' . $key . '":"' . escapeJsonString($val) . '"';
			}
			if ($key == "id") {
				$id .= ',"id":"' . escapeJsonString($val) . '"';
			}
		}

		$rowOutput .= $props . '}';
		$rowOutput .= $id;
		$rowOutput .= '}';
		$output .= $rowOutput;
	}

	$output = '{ "type": "FeatureCollection", "features": [ ' . $output . ' ]}';
	return $output;

}
?>
