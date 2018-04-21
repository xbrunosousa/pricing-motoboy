$(function(){	
	
	$('#mapa').jmap('init');
	
	$('form').submit(function(){
		
		$('#mapa').jmap('SearchDirections', {
			'query': 'from:' + $('#partida').val() + ' to:' + $('#chegada').val(),
			'locale': 'pt_BR',
			'panel':'#direcoes'
		}, function(result) {
			preco = Math.ceil(result.getDistance().meters /1000 * 1.9 + 5);
			$('#aviso').html("Preço aproximado: R$" + preco);
	   });
	   
		return false;
	});
	
});