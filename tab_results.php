<div class="container-fluid">
	<div class="row-fluid" >
	<div  class = "resposta" id = "Resultado" >
		<h5 align="center">Resultado da última consulta</h5>
		<h4 align="center" id="first_time">Nenhuma consulta realizada até o momento</h4>
		<h4 align="center" id="no_results" style="display: none">Nenhum resultado discreto. Resultados geográficos disponíveis no mapa.</h4>
	</div>
	</div>
	
	<div class = "salvarTabela">
	 <button class="btn btn-default btn-block btn-lg " type="button"  aria-hidden="true" onclick= "saveJson();"><i class ="glyphicon glyphicon-download" > </i>  JSON</button>
	 <br>
	 <br>
	 <button class="btn btn-default btn-block btn-lg " type="button" onclick="saveTablePdf();"> <i class ="glyphicon glyphicon-download" > </i>  PDF</button>
	 <br>
	 <br>
	 <button class="btn btn-default btn-block btn-lg " type="button" onclick="saveTableTxt();"><i class = "glyphicon glyphicon-download"> </i>  TXT</button>
	 <br>
	 <br>
	 <button class="btn btn-default btn-block btn-lg " type="button" onclick ="saveTableCsv();"><i class ="glyphicon glyphicon-download" > </i>  CSV</button>
	</div>
	
</div>