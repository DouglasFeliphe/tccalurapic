angular.module('meusServicos', ['ngResource'])
	.factory('recursoProf', function($resource) {

		return $resource('/v1/profs/:profId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})
	.factory("cadastroDeprofs", function(recursoprof, $q) {
		var service = {};
		service.cadastrar = function(prof) {
			return $q(function(resolve, reject) {

				if(prof._id) {
					recursoprof.update({profId: prof._id}, prof, function() {
						resolve({
							mensagem: 'Prof ' + prof.titulo + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a prof ' + prof.titulo
						});
					});

				} else {
					recursoprof.save(prof, function() {
						resolve({
							mensagem: 'prof ' + prof.titulo + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro) {
						alert('Não Resolveu');
						reject({
							mensagem: 'Não foi possível incluir a prof ' + prof.titulo
						});
					});
				}
			});
		};
		return service;
    });