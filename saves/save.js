function saveTablePdf() {
    var pdf = new jsPDF('p', 'pt', 'letter');// objeto que representa o pdf a ser criado
    source = $('#Resultado')[0]; //Fonte do html que contem a tabela, passa-se como paramtro o id
   
    
    // Apoiamos manipuladores de elementos especiais. Registre-los com jQuery-style
    // Selector ID para qualquer ID ou nome do nó. ("#iAmID", "div", "span", etc.)
    specialElementHandlers = {
    		// Elemento com id de "desvio" - seletor de estilo jQuery        
    		'#bypassme': function (element, renderer) {
            // true = "tratadas em outros lugares, a extração de texto de desvio"
            return true
        }
    };
    
    // Todas as coordenadas e larguras estão em jsPDF exemplo é declarado unidades
    // Polegadas, neste caso
    margins = {top: 80, bottom: 60, left: 40, width: 522};
    
    // Source : string HTML ou DOM elemento tabela
 	// margins.left: coordenada x
    // margins.top: coordenada y
    // margins.width: largura maxima do conteudo no PDF
    pdf.fromHTML(source, margins.left, margins.top, {'width': margins.width,
    	'elementHandlers': specialElementHandlers}, 
    
    //Dispose: objeto com X, Y da última linha adicionado ao PDF. 	
    // Este permitir a inserção de novas linhas após html
    function (dispose) { pdf.save('Test.pdf');}, margins);
}


//Funcao responsavel por salvar a tabela da consulta em formato CSV
function saveTableCsv(){
	$('#Resultado').tableExport({type:'csv',escape:'false'});	
}

//Funcao responsavel por salvar a tabela da consulta em formato txt
function saveTableTxt(){
	return $('#Resultado').tableExport({type:'txt',escape:'false'});
}

//Funcao responsavel por salvar a tabela da consulta em formato json
function saveJson(){
	return $('#Resultado').tableExport({type:'json',escape:'false'});
}

//Funcao responsavel por salvar a cosulta SQL
function saveSQL(){
//		//document.getElementById('conteudo').document.designMode = "On";
//	    var conteudo = '';
//	    conteudo += document.getElementById('query').value;
//	    
//	    document.body.innerHTML = conteudo;
//	    
//	    //var doc = document.getElementById("conteudo");
//	    document.getElementById('conteudo').execCommand('SaveAs', false,'arquivo.txt');
	return $('#query').tableExport({type:'txt',escape:'false'});

}