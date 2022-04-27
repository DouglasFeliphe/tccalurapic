angular.module('alurapic').controller('profsController', function($scope, recursoprof) {
	
	$scope.profs = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoprof.query(function(profs) {
		$scope.profs = profs;
	}, function(erro) {
		console.log(erro);
	});

	$scope.remover = function(prof) {

		recursoprof.delete({profId: prof._id}, function() {
			var indiceDaprof = $scope.profs.indexOf(prof);
			$scope.profs.splice(indiceDaprof, 1);
			$scope.mensagem = 'prof ' + prof.titulo + ' removido com sucesso!';
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar o TCC ' + prof.titulo;
		});
	};

});