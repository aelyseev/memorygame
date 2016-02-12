/**
 * @author aelyseev
 * @date 09/02/16
 */

var compile = require('lodash/template');

describe('Directives: menuButton directive', function () {
	'use strict';

	var $compile;
	var $scope;
	var template = compile('<div menu-button' +
		'<% if (typeof enable !== \'undefined\') { %>' +
			' enable="<%= enable %>"' +
		'<% } %>' +
		'<% if (typeof style !== \'undefined\') { %>' +
			' button-style="<%= style %>"' +
		'<% } %>' +
		'><%= text %>' +
		'</div>');

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}));

	it('Directive is defined', function () {
		var params = {enable: 'dirty', text: 'New game', style: 'button-menu menu-width'};
		var html = template(params);
		var $el;

		$scope.dirty = false;
		$el = $compile(html)($scope);
		$scope.$digest();

		expect($el.html()).to.contains(params.text);
		expect($el.hasClass('button-disabled')).to.equal(true);

		$scope.dirty = true;
		$scope.$digest();
		expect($el.hasClass('button-enabled')).to.equal(true);
	});
});
