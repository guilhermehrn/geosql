<!DOCTYPE html>
<html lang="br">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>GeoSQL+</title>

<!-- Bootstrap core CSS -->
<link href="./lib/bootstrap3/css/bootstrap.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="./indexfiles/index.css" rel="stylesheet">

<script src="./lib/vid/video.js"></script>
<link href="./lib/vid/video-js.css" rel="stylesheet" type="text/css">
<link href="./indexfiles/sobregeosql.css" rel="stylesheet" type="text/css">

<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

<script src="./lib/ie/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar" aria-expanded="false"
					aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand active"  data-toggle="tab" href="#inicio" id = "navgeo"><strong>GeoSQL+</strong></a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
<!-- 					<li class="active"><a data-toggle="tab" href="#inicio">Home</a></li> -->
					<li id ="htab1"><a href="#about" data-toggle="tab">Sobre</a></li>
					<li id ="htab2"><a href="#contact" data-toggle="tab">Contatos</a></li>

<!-- 					<a class="btn btn-outline btn-lg" href="https://github.com/twbs/bootstrap"></a> -->

				</ul>

			</div>


			<!--/.nav-collapse -->
		</div>

			<a href= "https://github.com/guilhermehrn/geosql.git"><button type="button" class="btn btn-info btn-xs" id="imggit" title= "Projeto no Github" ><img src="./indexfiles/img/github/GitHub-Mark-32px.png"
				class="imggit"></button></a>
	</nav>





	<div class="tab-content">

		<!-- Aba de inicio contem as visualizações -->
 		<div class="tab-pane  active" id="inicio">

	<!-- -->

	<div class="container">

		<div class="starter-template">
			<img src="./indexfiles/img/logGeosqlplus743x232.png" id="imglogo1"
				class="imglogo">
			<p class="lead" id="frase1">
				Esse é o GeoSQL+, um ambiente online para aprendizado de SQL
				espacialmente estendido.<br>
				<br> Escolha uma Banco de Dados para começar:
			</p>
			<div class = "seletor">
			<select class="form-control" id = "nomesBase">
			<option>Brasil</option>
			</select>

			<a href = "geosql.php"><button type="button" class="btn btn-success" id = "botaoIniciar" >
			<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
			Iniciar</button></a>


			</div>

			<div class="mastfoot">

				<div class="inner">
					<div class="rodape-institucional" id = "rodape">
					<p>
						<a href="http://www.dcc.ufmg.br">Departamento de Ciência da Computação</a> -
						<a href="http://www.ufmg.br">UFMG</a>
					</p>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- /.container -->

		</div>

		<div class="tab-pane" id="about">
			<div id = "sobre">
			<?php include dirname ( __FILE__ ) . "/indexfiles/sobregeosql.php";?>
			<br>
			</div>
		</div>

		<div class="tab-pane" id="contact">
			<div id ="contatos">
			<div><h4>Clodoveu Davis: clodoveu@dcc.ufmg.br </h4></div>
			<div><h4>Guilherme Henrique: guilherme@dcc.ufmg.br</h4></div>
			<br>

			</div>
		</div>
	</div>



	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="./lib/jquery/jquery-2.1.4.js" type="text/javascript"></script>
	<script src="./lib/bootstrap3/js/bootstrap.js" type="text/javascript"></script>

	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="./lib/ie/ie10-viewport-bug-workaround.js" type="text/javascript"></script>

<script type="text/javascript">
	$( "#navgeo" ).click(function() {
		document.getElementById("htab1").className = "";
		document.getElementById("htab2").className = "";
		});
</script>
</body>
</html>
