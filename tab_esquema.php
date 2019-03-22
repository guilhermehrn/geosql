<div class="tabEsquema">
	<div class="esquema" id="esquema">
		<?php
		include dirname ( __FILE__ ) . "/esquema/esquemabd.php";
		plotaschema ()?>
	</div>
	<br>
	<div class="consulta" id="consulta">
		<iframe id="conteudo" style="display: none"></iframe>
		<textarea rows="7" class="form-control" id="query"
			placeholder="SELECT * FROM ..."> </textarea>
		<div class="btn_query" id ="btn_query">
			<button id="execute_query" title="Pesquisar"
				class="btn btn-primary btn-block btn-lg" type="button"
				onclick="getDados();"><i class = "glyphicon glyphicon-play-circle"></i>  Pesquisar</button>
			<button id="salvar_sql" title="salvar SQL"
				class="btn btn-default btn-block btn-lg" type="button" onclick = "saveSQL()"
				><i class = "glyphicon glyphicon-save"></i> Salvar</button>
		</div>
		<button id="ajuda" title="Ajuda" class="btn btn-info btn-lg"
			type="button" onclick="Nova()">
			<i class="glyphicon glyphicon-question-sign"></i> Ajuda
		</button>
		<script type="text/javascript">
		var downloadSql = document.getElementById('downloadSql');
		//downloadSql.text = document.getElementById('query').value;
		function Nova(){
			window.open("help.php","titulo_da_pagina"); 
				}
		</script>
	</div>
	
</div>