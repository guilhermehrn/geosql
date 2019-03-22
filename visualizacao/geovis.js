/**
 * Aqui está o código javaScript que produz as visualizações dos mapas.
 *
 * Objetos do mapa = É o que tem em uma camada ou mapa, por exemplo, uma ferrovia, estrada ou uma cidade.
 *
 * A saber:
 * Features =  são os atributos do objeto.
 * Idlayer= ID de uma layer internemente no openlayers.
 * IdLayerVis = Contardor de uma layer no vizualição externamente ao openlayers.
 * Usado como sufixo dos Ids dos objetos HTML.
 */


/**
 * Define uma interação de seleção;
 */
var select = new ol.interaction.Select();

/**
 * Captura os IDs do popup
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Define uma overlayer para colocar no mapa, com isso da a posibilidade de criar
 * os popus com os atributos de cada features.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */
({
	element : container,
	autoPan : true,
	autoPanAnimation : {
		duration : 250
	}
}));


/**
 * Funcão usada para criar o estilo do texto em cada feature de um layer.
 * @param feature: Objeto de um mapa.
 * @param textRotuloKey: a chave de um dos rotulos presente na feature (ver GeoJSON).
 * Corresponde aos rotulos da colunas de uma tabela.
 * @param colorText: cor do texto do rotulo.
 */
var myText = function(feature, textRotuloKey, colorText) {

	return new ol.style.Text({
		text : feature.get(textRotuloKey),
		font : "12pt",
		fill : new ol.style.Fill(colorText)
	})

}

/**
 * Funcao que define o estilo para cada feature de uma layer.
 * @param colorStroker: cor da linhas dos objetos das layer.
 * @parm colorFill : cor de fundo de cada objetos de cada layer.
 * @parm textRotuloKey : define a chave do texto rotulo de cada objeto de uma layer.
 * @parm colorText : define a cor do texto rotulo de cada feature de uma layer.
 */
var dit;
var myStyle = function(colorStroker, colorFill, textRotuloKey, colorText) {
	console.log(textRotuloKey);
	return function(feature) {
	dit = feature;

	var tipo = dit.getGeometry().getType();
	if (tipo == "Point"){
		var style2= new ol.style.Style({
			    image: new ol.style.Circle({
			      radius: 10,
			      fill: new ol.style.Fill({
						color : colorFill
					}),//new ol.style.Fill({color: '#666666'}),
			      stroke: new ol.style.Stroke({
						color : colorStroker,
						// lineDash: [4],
						width : 1
					})

			    }), text : myText(feature, textRotuloKey, colorText)
			  });
		return [ style2 ];
	}else{

		var style = new ol.style.Style({
			stroke : new ol.style.Stroke({
				color : colorStroker,
				// lineDash: [4],
				width : 1
			}),
			fill : new ol.style.Fill({
				color : colorFill
			}),
			text : myText(feature, textRotuloKey, colorText)
		})
		return [ style ];
	}
}
}

/**
 * Cria a Layer(camada) do tipo de vetorial a partir de um codigo GeoJSON
 * @param codePath: codigo GeoJSON que será consumido para gerar a camada vetorial.
 * @param colorStroker: cor das linha da camada.
 * @param colorFill: cor do preenchimento das features da camada.
 * @param textRotuloKey : define a chave da propriedade texto que ira rotular as feature de cada camada
 * @param colorText : define a cor da propriedade texto que ira rotular cada feature de cada camada.
 * @returns {ol.layer.Vector} retorna uma layer do tipo vector
 */
var df;
function createLayerVector(codePath, colorStroker, colorFill, textRotuloKey, colorText, sql) {
	var corde = new ol.source.Vector({
		//url : codePath,
		url: 'bancoDados/bdPersistencia.php?query='+sql,
		format : new ol.format.GeoJSON(),
		wrapX : false
	});

	df = corde;
	var vector = new ol.layer.Vector({
		source : corde,
		style : myStyle(colorStroker, colorFill,textRotuloKey, colorText)
	});

	return vector;
}


/**
 * Essa função cria uma layer de fundo apartir de Mapa de satelite
 * @returns {ol.layer.Tile}
 */
function createLayerFundo() {
	var raster = new ol.layer.Tile({
		// source : new ol.source.MapQuest({
		// 	layer : 'sat',
		// 	wrapX : false
		// })
        //
        source : new ol.source.OSM({
            
            layers: 'basic,clabel,ctylabel,statelabel',
            transparent: true
           
        })
	});

	return raster;
}

/**
 * Função que de fato cria o mapa  com todos os controles de layers
 * @param arrayLayers vetor com todas as layers no mapa.
 * @returns {ol.Map} retona um objeto do tipo mapa com todas as ol.Map
 */
function createMap(arrayLayers) {

	var map = new ol.Map({
		interactions : ol.interaction.defaults().extend([ select ]),
		layers : arrayLayers,
		controls : ol.control.defaults().extend(
				[ new ol.control.OverviewMap(), new ol.control.ScaleLine(),
						new ol.control.Attribution(),
						new ol.control.ZoomSlider() ]),
		target : 'map',
		overlays: [overlay],
		view : new ol.View({
			center : [ 0, 0 ],
			zoom : 3
		})
	});
	return map;
}

/**
 * Cria uma layer base.
 */
var layerBase = [createLayerFundo()];

/**
 * Cria o mapa ode será adicionado mais camadas
 */
var map= createMap(layerBase);

$(function (){
	map.setTarget('map');
});

closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};

/**
 * Pega as feature selecionada pela ação de seleção.
 */
var selectedFeatures = select.getFeatures();

/**
 * Se uma feature ja tiver sido selecionada no momento que outro for selecionada então
 * a primeira selecão e desfeita.
 */
map.on('click', function() {
	  selectedFeatures.clear();
});

/**
 * Funcão que cria o conteudo do popup a apartir de uma feature.
 * @param objeto: objeto de uma layer do mapa
 */
 var mayPara = function(objeto) {

	var keys = objeto.getKeys();
	var cont = 1;
	var str = '<div id = "popupRotGrup">';
	for (cont = 1; cont < keys.length; cont++) {
		str = str + '<div id = "popupRotulo" style = "" >'
				+ keys[cont] + ':' + '</div>' + '<div id = "popupKey">'
				+ objeto.get(keys[cont]) + "<br>"+ '</div>';
	}
	return str + '</div>';
}

/**
 * Função que trata o evento de seleção de um objeto no mapa adicionando ao
 * respectivo popup as informações do objeto.
 */
select.on('select', function() {
	var keys = selectedFeatures.getArray()[0];
	// console.log ();
	if (keys !== undefined) {
		$(content).append(mayPara(keys));

	}
});

/**
 * Função que trata o evento de seleção de um objeto adicionando a localização geográfica
 * onde ocorreu o click.
 */
map.on('singleclick', function(evt) {
	var coordinate = evt.coordinate;
	var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate,
			'EPSG:3857', 'EPSG:4326'));

	content.innerHTML = '<p>Você clicou aqui:</p><code>' + hdms
			+ '</code><br></br>';

	overlay.setPosition(coordinate);

});

/**
 *Vetor que mantem internamente no openlayer qual camada está na visualização e qual a sua posição na pilha de camadas.
 *Ver ver a variável "arraylayer" na função "createMap".
 */
var layerAtivos = [];

/**
 * Vetor que mantem  os sufixos do IDs dos elementos associados a cada uma das camadas. Exemplo: camada 1 = > id: layer0
 * id (ou posição) dentro do openlayer: 1; o sufixo dos objtos HTML que o manipulam e 1.
 * Esse vetor e indexado pelos ID externos (Ou HMTL) das camadas.
 */
var layerAtivosID = [];

/**
 * Armazena os rotulos dos IDs ativos.
 */
var rotuloLayers =  [];

/**
 * Funcão que monta a legenda da layer base.
 * @param idLayerVis: o contador dessa layer ou a numeração de dela na vizualização. Externo ao openlayers.
 */
function montarLegendaLayerbase(idLayerVis){
	//inssere uma entrada na legenda
	$("#legenda").append('<div class ="legendaL ui-state-default" id ="layer' + idLayerVis +
			'" data-placement="left" title="Camada Base">');

	//insere um menu de desligar/ligar uma camada de visualização.
	$('#layer' +  idLayerVis).append('<button type="button" class="btn btn-primary btnV"' +
			'title= "Mostra/Esconder Camada"  onclick = "onOffCamadas('
			+idLayerVis +',' + idLayerVis + ');"  id = "onOff'+  idLayerVis +'">');

	$('#onOff' +  idLayerVis).append('<i class="glyphicon glyphicon-eye-close" id ="onOfficon' +
			idLayerVis + '"></i>');

	//insere o botão de excluir camada
	$('#layer' +  idLayerVis).append('<button type="button" class="btn btn-default" title= "Excluir Camada"'
			+ 'id = "visb'+ idLayerVis +'" onclick = "desligaLayer(' + idLayerVis +',' + idLayerVis + ','
			+'layer' + idLayerVis + ');">');

	$('#visb' +  idLayerVis).append('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>');

	//adiciona o rotulo da camada
	$('#layer' +  idLayerVis).append('<div class = "rotulolegenda"><h4>'+ 'Camada: ' + idLayerVis + '</h4></div>');

	layerAtivos.push(idLayerVis);
	layerAtivosID["layer0"] = 0;
	//idl["layer0"] = 0;
}


/**
 * Funcão que monta e insere uma entrada de uma layer do tipo vector na legenda.
 * @param idLayerVis : Contador da laier na vizualização.
 * @param idLayer :  Contador da layer internamente no openlayer.
 * @param colorStroker : Cor de uma linha do objeto.
 * @param colorFill : Cor de preenchimento de um objeto.
 * @param VetRotuloKey : vetor de chaves de rotulos (rotulos das colunas da tabela), obtidos de um GeoJSON.
 * @param consulta : String que representa a consulta feita para gerar a camada.
 */
function montarLegendaLayerVector(idLayerVis, idLayer, colorStroker, colorFill, VetRotuloKey, consulta){

	//inssere uma entrada na legenda
	$("#legenda").prepend('<div class ="legendaL ui-state-default" id ="layer' + idLayerVis +
			'" data-placement="left" title="'+consulta +'">');

	//insere um botaão para mudar a cor de preenchimento do mapa
	$('#layer' + idLayerVis).append ('<input id="colorpickerF'+ idLayerVis +
			'" class="btn form-control"  title= "Cor do Preechimento" onchange="mudarCor('+
			idLayerVis+')" value="'+ colorFill+'" type="color"></input>');

	//insere uma botão para mudar a cor da linha do mapa
	$('#layer' +  idLayerVis).append('<input id="colorpickerL'+ idLayerVis +
			'" class="btn form-control lineFillSelec" title= "Cor da Linha" onchange="mudarCor('+
			idLayerVis+')" value="'+ colorStroker +'" type="color"></input>');

	//insere um menu dropDow para selecionar os rotulos
	$('#layer' +  idLayerVis).append(geradorMenuDeRotulos(idLayer,idLayerVis, VetRotuloKey));

	//insere um menu de desligar/ligar uma camada de visualização.
	$('#layer' +  idLayerVis).append('<button type="button" class="btn btn-primary btnV"' +
			'title= "Mostra/Esconder Camada"  onclick = "onOffCamadas('
			+idLayerVis +',' + idLayer + ');"  id = "onOff'+  idLayerVis +'">');

	$('#onOff' +  idLayerVis).append('<i class="glyphicon glyphicon-eye-close" id ="onOfficon' +
			idLayerVis + '"></i>');

	//insere o botão de downLoad Geojson.
	$('#layer' +  idLayerVis).append('<a download="geo.json"' + 'id = "aDowgeojson' + idLayerVis +
			'" href="bancoDados/bdPersistencia.php?query='+document.getElementById("query").value+'">');

	$('#aDowgeojson' + idLayerVis ).append ('<button type="button" class="btn btn-default btnV" title= "Download GeoJSON"'
			+ 'id = "dow' + idLayerVis + '">');

	$('#dow' + idLayerVis).append('<i class="glyphicon glyphicon-download" ></i>');

	//insere o botão de excluir camada
	$('#layer' +  idLayerVis).append('<button type="button" class="btn btn-default" title= "Excluir Camada"'
			+ 'id = "visb'+ idLayerVis +'" onclick = "desligaLayer(' + idLayerVis +',' + idLayer + ','
			+'layer' + idLayerVis + ');">');

	$('#visb' +  idLayerVis).append('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>');

	//adiciona o rotulo da camada
	$('#layer' +  idLayerVis).append('<div class = "rotulolegenda"><h4>'+ 'Camada: ' + idLayer + '</h4></div>');

	layerAtivos.push(idLayer);
	layerAtivosID["layer" + idLayerVis] = idLayerVis;

	rotuloLayers.push(null);
}


/**
 * Funcão que monta uma legenda para um conjunto de conjunto de layers.
 * @param vetLayers: vetor com as layer.
 */
function montarLegenda(vetLayers) {
	var cont;
	montarLegendaLayerbase(0);
	var vetlayrs = map.getLayers().getArray();
	for (cont = 1; cont < vetLayers.length; cont++) {

		montarLegendaLayerVector(cont,cont,cont, 'blue', 'blue');
	}
	//return layerAtivos;
}


/**
 * Função que insere uma camada no mapa.
 * @param layerVector : uma camada do tipo vector (ver API do OpenLayers)
 * @param colorStroker : Cor da linhas da camada
 * @param colorFill : Cor de preenchimento do objetos da camada.
 * @param VetRotuloKey : Vetor com as chaves do rotulos das features dos objetos da camada (nomes das colunas das tabela resultado)
 * @param consulta : String da consulta SQL que gerou a visualização.
 */
function inserCamada(layerVector, colorStroker, colorFill, VetRotuloKey, consulta){
	var tamanho = layerAtivos.length;
	var arraylays = map.getLayers().getArray();
	var vetlayrs = arraylays.length;
	var chaves ='';
	//var vetkeys = '';
	map.addLayer(layerVector);
	//console.log(vetlayrs);
	montarLegendaLayerVector(tamanho, vetlayrs, colorStroker, colorFill,VetRotuloKey,consulta);
	//console.log(vetlayrs);
}


/**
 * Função que faz "Ligar e Desligar" uma camada da visualização.
 * @param idLayerVis : Contador da laier na vizualização.
 * @param idLayer : Contador da layer internamente no openlayer.
 */
function onOffCamadas(idLayerVis, idLayer) {
	var camadaMap = map.getLayers().getArray();
	var visivelCamada = camadaMap[idLayer].getVisible();
	if (visivelCamada == true) {
		camadaMap[idLayer].setVisible(false);
		$('#onOff' + idLayerVis).attr("class", "btn btn-default btnV");
		$('#onOfficon' + idLayerVis).attr("class",
				"glyphicon glyphicon-eye-open");
	} else {
		camadaMap[idLayer].setVisible(true);
		$('#onOff' + idLayerVis).attr("class", "btn btn-primary btnV");
		$('#onOfficon' + idLayerVis).attr("class",
				"glyphicon glyphicon-eye-close");
	}
}

/**
 * Função que muda  a cor de prenchimento e das linhas dos objetos das camadas
 * @param idLayerVis : Contador da laier na vizualização
 */
function mudarCor(idLayerVis) {
	var novaCorFill = document.getElementById('colorpickerF' + idLayerVis).value;
	var novaCorStrocker = document.getElementById('colorpickerL' + idLayerVis).value;
	var novoRotuloKey = rotuloLayers [idLayerVis];
	var l = layerAtivos[idLayerVis]
	map.getLayers().getArray()[l].setStyle(myStyle(novaCorStrocker, novaCorFill, novoRotuloKey, "#333"));

}


/**
 * Função aque muda os routulos dos objetos das camadas
 * @param idLayerVis: Contador da laier na vizualização.
 * @param novoRotulo: Chave do novo rotulo.
 */
function mudarRotulo(idLayerVis, novoRotulo){

	console.log("mudarotulo" + novoRotulo);
	rotuloLayers[idLayerVis] = novoRotulo;
	mudarCor(idLayerVis);
}

/**
 * Função que gera o  menuro que com as chaves dos rotulos para escolher.
 * @param idLayer : Contador da layer internamente no openlayer.
 * @param idLayerVis: Contador da laier na vizualização.
 * @param VetRotuloKey: Vertor com as chaves dos rotulos de um objeto.
 * @returns {String}: Strig HTML.
 */
function geradorMenuDeRotulos(idLayer,idLayerVis, VetRotuloKey) {

	var contElemt = VetRotuloKey.length;
	var strhtml = '<div class="btn-group btnV">'+
	 ' <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
	   + 'Rótulo <span class="caret"></span>'+
	  '</button>'+
	  '<ul class="dropdown-menu">';
	var i = 0;

	strhtml += '<li><a onclick = "mudarRotulo('+ idLayerVis +', ' + "null" +  ')"><p class="text-danger">VAZIO</p></a></li>';

	for(i = 0;i<contElemt;i++){
		strhtml += '<li><a onclick = "mudarRotulo('+ idLayerVis +', ' + "'" +VetRotuloKey[i]+ "'" +')">'+ VetRotuloKey[i]+'</a></li>';

	}
	strhtml = strhtml +  '</ul>'+ '</div>';

	return strhtml;
	//TODO
}


/**
 * Função que exclui uma layer
 * @param idLayerVis: Contador da laier na vizualização
 * @param idLayer : Contador da layer internamente no openlayer.
 * @param divLegenda : Id da div que representa a entrada na legenda.
 */
function desligaLayer(idLayerVis, idLayer, divLegenda) {
	var vetl = [];
	var cont = 0;
	var strhtml = '';
	var newcomando = '';
	map.removeLayer(map.getLayers().getArray()[idLayer]);
	$(divLegenda).remove();
	layerAtivos[idLayerVis] = -1;
	layerAtivosID["layer" + idLayerVis] = -1;
	vetl = map.getLayers().getArray();
	var cont2 = 0;

	for (cont = 0; cont < layerAtivos.length; cont++) {

		if (layerAtivos[cont] != -1 && cont2 < vetl.length) {
			strhtml = '#visb' + cont;
			newcomando = 'desligaLayer(' + cont + ',' + cont2 + ',' + 'layer'
					+ cont + ');';
			$(strhtml).attr("onclick", newcomando);

			strhtml = '#onOff' + cont;
			newcomando = 'onOffCamadas(' + cont + ',' + cont2 + ');';
			$(strhtml).attr("onclick", newcomando);

			layerAtivos[cont] = cont2;
			cont2++;
		}
	}
}
$(document).ready(function() {
	$("#botaoLegenda").click(function() {
		$("#legenda").slideToggle("slow");
	});

});

$(function() {
    $( "#legenda" ).sortable();

    $( "#legenda" ).disableSelection();
   // console.log($( "#legenda" ).sortable( "toArray" ));
  });


$( "#legenda" ).on( "sortstop", function( event, ui ) {
	var londemLegenda = $( "#legenda" ).sortable( "toArray" );
	//var lmapAntes = map.getLayers().getArray();
	var lmapDepois = [];
	var londemLengIdex = [];
	var posMapLegenda = [];

	var mapNovoCollection = map.getLayers();
	var mapNovoGroup = map.getLayerGroup();
	var mapNovoCollection2 = mapNovoCollection;

	var i =0;
	map.render();
	for(i = londemLegenda.length - 1 ; i >= 0 ; i--){
		londemLengIdex.push( layerAtivosID[londemLegenda[i]]);
	}

	console.log("legenda ", londemLegenda);
	console.log("legendaIDEX ", londemLengIdex);

	for(i = 0; i < londemLengIdex.length; i++){
		posMapLegenda[i] = layerAtivos [londemLengIdex[i]];
	}

	console.log("PosMap ", posMapLegenda);
//	for(i = 0; i < posMapLegenda.length; i++ ){
//		lmapDepois[i] =lmapAntes[posMapLegenda[i]]
//		layerAtivos[londemLengIdex[i]] = i;
//	}
//
	console.log("layerAtivosDepois", layerAtivos);
	var temp = [];
	for(i = 0; i < posMapLegenda.length; i++ ){
		temp[i] = mapNovoCollection.removeAt(0);
		layerAtivos[londemLengIdex[i]] = i;
	}

	console.log ("agora vai");

	for(i = 0; i < posMapLegenda.length; i++ ){
		mapNovoCollection.insertAt(i, temp[posMapLegenda[i]]);
		layerAtivos[londemLengIdex[i]] = i;
	}

	var cont = 0;
	for (cont = 0; cont < layerAtivos.length; cont++) {

		if (layerAtivos[cont] != -1) {
			strhtml = '#visb' + cont;
			newcomando = 'desligaLayer(' + cont + ',' + layerAtivos[cont] + ',' + 'layer'
					+ cont + ');';
			$(strhtml).attr("onclick", newcomando);

			strhtml = '#onOff' + cont;
			newcomando = 'onOffCamadas(' + cont + ',' + layerAtivos[cont] + ');';
			$(strhtml).attr("onclick", newcomando);

		}
	}


} );


/**
 * funcão para inicializar os mapas
 *
 * @returns {Array}
 */
function createVetL(VetRotuloKey) {
	//var vecl1 = createLayerVector(null, '#00558E', "#CFF09E", [0], '#333', data);
	var vecl1 = createLayerVector(null, '#00558E', "#CFF09E", [0], '#333', retiraQuebraLinha(document.getElementById("query").value));
	console.log ('CreateVetL' . VetRotuloKey);
	inserCamada(vecl1, '#00558E', '#CFF09E', VetRotuloKey ,document.getElementById("query").value);

}
montarLegendaLayerbase(0);
//var array = createVetL();
//var vecl1 = createLayerVector("/geosql6/visualizacao/br2.json", '#00558E', "#CFF09E", 'sigla', '#333');
/*$('#tab1').attr("class", 'tab-pane');
$('#tab0').attr("class", 'tab-pane active');*/
//var sortedIDs = $( "#legenda" ).sortable( "toArray" );
//var a = ['some','man', 'dob'];
//var vecl1 = createLayerVector("br.json", '#00558E', "#CFF09E", 'sigla', '#333');
//feature = vecl1.getFeatureById(1);

//montarLegenda(map.getLayers().getArray());

//var a = new ol.source.Vector({url: 'ferro.json', format : new ol.format.GeoJSON()});
//console.log(a.getFeatureById(1));

