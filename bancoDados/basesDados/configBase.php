<?php
define ( 'bd_dns', "pgsql" );
define ( "bd_name", "brasil" );
define ( "bd_server", "sandwich.lbd.dcc.ufmg.br" );
define ( "bd_user", "geosql" );
define ( "bd_password", "ge0sq1" );
define ( "bd_schema", "public" );
define ( "bd_port", "5432" );
define ( "geografico", true );
define ("bd_geom_coll", "geom");


function getParametroBase() {
	$parametros = "host=" . bd_server . " dbname=". bd_name . " user=" . bd_user . " password=" . bd_password;
	return $parametros;
}

function getGeomColunName(){
	$temp = bd_geom_coll;
	return $temp;

}

function db_schema() {
	$sql = "
        SELECT t.table_name as tabela, c.column_name as coluna
        FROM information_schema.tables t, information_schema.columns c
        WHERE t.table_name = c.table_name
        and t.table_catalog = '".bd_name."'
        and t.table_schema = '".bd_schema."'
        and t.table_type = 'BASE TABLE'
        ORDER BY t.table_name, c.column_name;
        ";

	return $sql;
}

?>
