<?php
include 'consulta.php';
include dirname(__FILE__).'/basesDados/configBase.php';
error_reporting(0);
/**
 * Funcão que faz a persistencia com o Banco.
 *
 * @param string $dadosConexao
 *        	Dados necessarios para fazer a conexão
 * @param string $consulta
 *        	consulta a ser realizada
 * @param string $colGeometrica
 *        	nome da coluna geomentrica presente na base.
 * @return string uma string em formato geojsom contendo o resultado da consulta.
 */
function persistencia($dadosConexao, $consulta, $colGeometrica) {
	$conexao = pg_pconnect ( $dadosConexao );
	
	$tabelaGeom = retornarTabelasGeometrica ( $conexao );
	$keyProc = 0;
	$keyProc = strpos ( $consulta, "*" );
	$strcount = strpos ($consulta, "count(");
	$pgResultado = null;
	
	if ((($keyProc != 0) && temTabelaGeometria ( $tabelaGeom, $consulta ))) {
		
		$pgResultado = consultarGeoBase ( $consulta, $colGeometrica, $conexao );
		return $pgResultado;
	} else {
		if (stristr ( $consulta, $colGeometrica ) != FALSE) {
			$pgResultado = consultarGeoBase ( $consulta, $colGeometrica, $conexao );
			return $pgResultado;
		} else {
			$pgResultado = consultarBase ( $consulta, $conexao );
			return $pgResultado;
		}
	}
	
	$cont = pg_num_rows ( $pgResultado );
	
	if ($cont > 0) {
		// $geojsonResult = postgisToGeojson ( $pgResultado );
		return $pgResultado;
		// return $geojsonResult;
	} else {
		echo "Não foram encontrados registros!";
	}
}

// Verifica se existe a variável txtnome
if (isset ( $_GET ["query"] )) {

	$consulta = utf8_encode($_GET ["query"]);
	// $consulta = "select * from bacia1";
	$dadosConexao = getParametroBase();//"host=sandwich.lbd.dcc.ufmg.br dbname=brasil user=guilherme password=123";
	//echo "olha o que ta entradndo : ". $consulta;
	
	$result = persistencia ( $dadosConexao, $consulta, getGeomColunName());
	
 	$tabela = "<table class='table table-bordered' id= 'tableResult'> <thead> <tr> ";
 	$i = pg_num_fields ( $result );
 }
 
 
 echo $return = postgisToGeojson($result);
?>
