<!DOCTYPE html>
<html lang="pt-br">
<head>

<meta charset="utf-8">
<title>GeoSQL Ajuda</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<link href="lib/bootstrap3/css/bootstrap.css" rel="stylesheet">
<link href="lib/bootstrap3/css/bootstrap-theme.css" rel="stylesheet">
<link href="css/estilo.css" rel="stylesheet">
<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.4/styles/default.min.css">

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="./lib/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="./lib/bootstrap3/js/bootstrap.min.js"></script>





<!--  <link href="css/especifico.css" rel="stylesheet">-->

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<!-- Fav and touch icons -->
</head>

<body>

	<div class="mainSpace">
		<div class="logo">
			<img src="imagens/logoGeosql210x56.png"
				class="img-rounded img-responsive">
		</div>

		<!-- Aqui entra as tabs para visualização dos resultados -->
		<div id="tabs">
			<ul class="nav nav-tabs" id="mytab">

				<!-- Tab para visualização dos dados -->
				<li class="active"><a href="#tab0" data-toggle="tab"><i
						class="glyphicon glyphicon-info-sign"></i> Ajuda </a></li>
				<li class=""><a href="#tab1" data-toggle="tab"><i
						class="glyphicon glyphicon-book"></i> PostGis </a></li>

			</ul>

			<!-- Aqui temos o que ira conter dentro de cada tab -->
			<div class="tab-content">

				<div class="tab-pane active" id="tab0">
					<div id = "sobre">
						<div class="header aligncenter">
							<h3 class="light">Tutorial (Em construção)</h3>
						</div>
						<div class="container-fluid">
							<div class="row-fluid">
								<p>Ferramenta foi projetada para ser o mais simples possível. As
									consultas recebem um apoio das tabelas com as respectivas
									informações.</p>
								<p>O Usuario pode consultar as tabelas disponivel no esquema na Aba Esquema.
								com isso o usuaro pode digitar sua consulta e então, poder visualizar a consulta em forma
								de tabela (aba "Tabela"), ou de mapa ("aba map").
								</p>
								
							</div>
						</div>
					</div>

					<div id = "sobre">
						<div class="header aligncenter">
							<h3 class="light">Desenvolvimento</h3>
						</div>
						<div class="container-fluid">
							<div class="row-fluid aligncenter">
								<p>
									O GeoSQL+ foi desenvolvido por <strong>Guilherme Henrique</strong> aluno de Iniciação Científica. 
									do Departamento de Ciência da
									Computadação da Universidade Federal de Minas Gerais. Este
									trabalho foi desenvolvido Sob orientação do Professor
									Dr. Clodoveu Davis Jr. e financiado pelo PIBIC/CNPq para os próximos alunos da Disciplina de Banco de Dados Geográficos e de outras disciplinas correlatas.
								</p>

								<p>Este site é um sistema com código aberto, sobre a licença GNU
									v2. O proposito do desenvolvimento é contar futuramente com a ação
									colaborativa dos demais alunos que utilizarão e que poderão
									ampliar a abrangência do sistema, criando novas
									funcionalidades, melhorando as já existentes e, principalmente,
									aprendendo com ela.</p>
							</div>
						</div>
					</div>

				</div>

				<div class="tab-pane" id="tab1">
					<iframe src="http://postgis.net/docs/manual-2.1/reference.html"
						id="postgref"></iframe>
				</div>


			</div>
		</div>

	</div>
</body>
</html>
