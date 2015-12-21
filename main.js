/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 15/12/15
	 */
	
	var app = __webpack_require__(1);
	
	// styles
	__webpack_require__(3);
	__webpack_require__(4);
	
	// config
	__webpack_require__(5);
	
	// controllers
	__webpack_require__(8);
	__webpack_require__(11);
	
	//settings
	__webpack_require__(17);
	__webpack_require__(18);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 15/12/15
	 */
	
	module.exports = __webpack_require__(2).module('app', [
		'ngRoute', 'ngStorage'
	]);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"icon0":"_3kiQWo","rotate":"_2GVRvD","move0":"_1Pst8o","icon1":"vsFxrw","move1":"_2MXAZR","icon2":"_3eTMQs","move2":"_2prDJW","icon3":"_2L1_Qk","move3":"_2_noVz","icon4":"_2hVB2a","move4":"_1sRuJP","icon5":"_1mky_v","move5":"_30hXA6","icon6":"_14ieiu","move6":"_1STrSp","icon7":"_1HHKJ5","move7":"XGMVlg","icon8":"_3rD_iQ","move8":"_1qqGGe","icon9":"_26BKsP","move9":"_3dscAZ","icon10":"_2wW024","move10":"_1dUfnA","icon11":"_1dWX-V","move11":"_2yZMhs","icon12":"_2J0uSF","move12":"_1hH4iM","icon13":"_2SsO7X","move13":"y1Kvnf","icon14":"_3T9Sg3","move14":"_2Jcnwf","icon15":"_1j8JBZ","move15":"lQB5Hj","icon16":"_2wrbUf","move16":"o8FR4V","icon17":"_2IV6Hk","move17":"wyLVX_","icon18":"_1obnRO","move18":"wE9rKU","icon19":"CgdZO9","move19":"qfomPR","icon20":"cbLZk2","move20":"_1OTggF","icon21":"_3WqNhg","move21":"KByxMK","icon22":"_2rdhr8","move22":"_3OEcSJ","icon23":"_3aSKcA","move23":"_3yOAtN","icon24":"_1JAsPT","move24":"_3_6n0M","icon25":"_1FEM-x","move25":"_3-cRGy","icon26":"_1lLPpp","move26":"_1A9Z40","icon27":"_229veP","move27":"_13FTYP","icon28":"_3cRZuu","move28":"_1ThFpy","icon29":"RviMrP","move29":"_1zZUhZ","icon30":"G0BUUO","move30":"_2ckz8e","icon31":"A1vehD","move31":"_1DLZ_D","icon32":"_3ZH1NQ","move32":"_1YBmU9","icon33":"_2zhJVW","move33":"_1_pnJP"};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	var menuUrl = __webpack_require__(6);
	var gameUrl = __webpack_require__(7);
	
	app.config(['$localStorageProvider', function ($localStorageProvider) {
			'use strict';
	
			$localStorageProvider.setKeyPrefix('game_');
		}])
		.config(function ($routeProvider) {
			'use strict';
	
			$routeProvider
				.when('/', {
					templateUrl: menuUrl,
					controller: 'MenuController'
				})
				.when('/game', {
					templateUrl: gameUrl,
					game: false,
					controller: 'GameController'
				})
				.otherwise({
					redirectTo: '/game'
				})
			;
		});


/***/ },
/* 6 */
/***/ function(module, exports) {

	var path = '/app/js/menu/view.tmpl.html';
	var html = "<div class=main><div menu-button button-style=\"button-menu menu-width\" action=newgame>New Game</div><div class=\"block menu-width\"><div class=block-title>Board sizes</div><div class=block-options><span ng-repeat=\"size in sizes track by $index\" ng-class=\"{'block-options-item-selected': sizes[$index].active}\" ng-click=setSize(sizes[$index].name) class=\"block-options-item block-options-item-active\">{{sizes[$index].name}}</span></div></div></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var path = '/app/js/game/view.tmpl.html';
	var html = "<div board></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	
	// new button
	__webpack_require__(9);
	
	app.controller('MenuController', ['$scope', '$location', 'settings', function ($scope, $location, Settings) {
		'use strict';
		$scope.sizes = Settings.getState();
	
		$scope.setSize = function (name) {
			$scope.sizes = Settings.setState(name);
		};
	
		$scope.newgame = function () {
			$location.url('/game');
		};
	}]);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	var url = __webpack_require__(10);
	
	app.directive('menuButton', ['$location', function () {
		'use strict';
	
		return {
			restricts: 'A',
			replace: true,
			scope: {
				buttonStyle: '@',
				action: '='
			},
			transclude: true,
			templateUrl: url
		};
	}]);


/***/ },
/* 10 */
/***/ function(module, exports) {

	var path = '/app/js/directives/menu-button.tmpl.html';
	var html = "<div ng-class=buttonStyle ng-click=action() ng-transclude class=\"button button-centered\"></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	
	// directives
	__webpack_require__(9);
	__webpack_require__(12);
	
	app.controller('GameController', ['$scope', 'settings', 'puzzleMetrics', function ($scope, Settings, metrics) {
		'use strict';
		var size = Settings.getActiveSize();
	
		$scope.boardSize = size * metrics.size + (2 * metrics.space * size);
	}]);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	var boardUrl = __webpack_require__(13);
	var puzzleStyles = __webpack_require__(4);
	var iconNames = __webpack_require__(14);
	var startId = 0;
	var p = __webpack_require__(15);
	
	var generatePuzzles = function (images, boardSize) {
		'use strict';
	
		var i;
		var puzzles = [];
		var pair;
		var iconName;
		var puzzle;
	
		var state = false;
		var icons = images.slice(0);
	
		var puzzleIds = Array.apply(null, new Array(boardSize * boardSize)).map(function (v, id) {
			return id;
		});
	
		var random = function (ceil) {
			return Math.floor(Math.random() * ceil);
		};
	
		for (i = 0; i < (boardSize * boardSize / 2); i++) {
			iconName = icons.splice(random(icons.length), 1)[0];
			pair = [
				puzzleIds.splice(random(puzzleIds.length), 1)[0],
				puzzleIds.splice(random(puzzleIds.length), 1)[0]
			];
	
			puzzle = {
				solved: false,
				clicks: 0,
				classes: puzzleStyles[iconName],
				open: state
			};
	
			puzzles.push(
				angular.extend({id: pair[0], pair: pair[1]}, puzzle, {index: startId++}),
				angular.extend({id: pair[1], pair: pair[0]}, puzzle, {index: startId++})
			);
		}
		return puzzles.slice(0).sort(function (a, b) {
			return a.id - b.id;
		});
	};
	
	app.directive('board', ['settings', 'puzzleMetrics', '$location', function (Settings, metrics, $location) {
		'use strict';
	
		return {
			restrict: 'A',
			replace: true,
	
			templateUrl: boardUrl,
	
			link: function (scope) {
				scope.metricsStyle = 'width:' + metrics.size + 'px; height: ' +
					metrics.size + 'px; margin: ' + metrics.space + 'px';
	
				scope.animationName = puzzleStyles.rotate;
	
				scope.gotomenu = function () {
					$location.url('/');
				};
	
				scope.countClicks = function () {
					scope.clicks++;
				};
	
				scope.newgame = function () {
					scope.puzzles = generatePuzzles(iconNames, Settings.getActiveSize());
					scope.solved = false;
					scope.opened = [];
					scope.clicks = 0;
				};
	
				scope.toggle = function (id) {
					scope.$apply(function () {
						var state = !scope.puzzles[id].open;
						scope.puzzles[id].open = state;
						if (state) {
							scope.opened.push(id);
						}
						scope.check();
						scope.updateBoard();
					});
				};
	
				scope.check = function () {
					var puzzles = scope.puzzles;
					var pair;
	
					if (scope.opened.length < 2) {
						return;
					}
	
					pair = scope.opened.splice(0, 2);
	
					if (puzzles[pair[0]].pair === puzzles[pair[1]].id) {
						scope.puzzles[pair[0]].solved = scope.puzzles[pair[1]].solved = true;
					} else {
						pair.forEach(function (i) {
							scope.puzzles[i].clicks++;
						});
					}
				};
	
				scope.updateBoard = function () {
					scope.solved = scope.puzzles.every(function (puzzle) {
						return puzzle.solved;
					});
				};
	
				scope.newgame();
			}
		};
	}]);


/***/ },
/* 13 */
/***/ function(module, exports) {

	var path = '/app/js/directives/board.tmpl.html';
	var html = "<div><div class=board-game-menu ng-style=\"{width: boardSize + 'px'}\"><div menu-button button-style=button-game action=gotomenu>Main menu</div><div ng-if=!solved class=board-game-menu-info>Clicks: {{clicks}}</div><div ng-if=solved menu-button button-style=button-game action=newgame>You won! Start a new game!</div></div><div class=board ng-style=\"{width: boardSize + 'px'}\"><div puzzle ng-repeat=\"puzzle in puzzles track by puzzle.index\"></div></div></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* eslint-disable  */
	module.exports = [
	"icon0", 
	"icon1", 
	"icon2", 
	"icon3", 
	"icon4", 
	"icon5", 
	"icon6", 
	"icon7", 
	"icon8", 
	"icon9", 
	"icon10", 
	"icon11", 
	"icon12", 
	"icon13", 
	"icon14", 
	"icon15", 
	"icon16", 
	"icon17", 
	"icon18", 
	"icon19", 
	"icon20", 
	"icon21", 
	"icon22", 
	"icon23", 
	"icon24", 
	"icon25", 
	"icon26", 
	"icon27", 
	"icon28", 
	"icon29", 
	"icon30", 
	"icon31", 
	"icon32", 
	"icon33"
	];


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 17/12/15
	 */
	
	var app = __webpack_require__(1);
	var puzzleUrl = __webpack_require__(16);
	
	app.directive('puzzle', ['$window', function ($window) {
		'use strict';
		return {
			restrict: 'A',
			replace: true,
			templateUrl: puzzleUrl,
			link: function (scope, element, attrs) {
				var puzzle = scope.puzzles[attrs.id];
	
				scope.$watch('puzzles[$index].clicks', function (newVal, oldVal) {
					if (oldVal === newVal) {
						return;
					}
					$window.requestAnimationFrame(function () {
						element.removeClass('puzzle-animated-paused');
					});
				});
	
				element.on('animationiteration', function (e) {
					if (e.animationName !== scope.animationName) {
						return;
					}
					$window.requestAnimationFrame(function () {
						element.addClass('puzzle-animated-paused');
						scope.toggle(attrs.id);
					});
				});
	
				element.on('click', function () {
					if (puzzle.open || puzzle.solved) {
						return;
					}
	
					scope.countClicks();
	
					$window.requestAnimationFrame(function () {
						element.removeClass('puzzle-animated-paused');
					});
				});
			}
		};
	}]);


/***/ },
/* 16 */
/***/ function(module, exports) {

	var path = '/app/js/directives/puzzle.tmpl.html';
	var html = "<div class=\"puzzle puzzle-animated puzzle-animated-paused\" data-id={{::puzzles[$index].id}} ng-class=puzzles[$index].classes style={{::metricsStyle}} ng-style=\"{'background-image': puzzles[$index].open ? puzzles[$index].icon : ''}\"></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 21/12/15
	 */
	
	var app = __webpack_require__(1);
	
	app.service('settings', ['$localStorage', function ($localStorage) {
		'use strict';
		var defaults = [
			{name: '4×4', active: false},
			{name: '6×6', active: true},
			{name: '8×8', active: false}
		];
	
		this.getState = function () {
			var state = $localStorage.state;
	
			if (!state) {
				$localStorage.state = state = defaults;
			}
	
			return defaults.map(function (s, i) {
				return angular.extend({}, s, state[i]);
			});
		};
	
		this.getActiveSize = function () {
			var activeName = this.getState().filter(function (state) {
				return state.active;
			})[0].name;
			return Number(activeName[0]);
		};
	
		this.setState = function (name) {
			var newstate = this.getState().map(function (state) {
				state.active = state.name === name;
				return state;
			});
			$localStorage.state = newstate;
			return newstate;
		};
	}]);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author aelyseev
	 * @date 21/12/15
	 */
	var app = __webpack_require__(1);
	app.constant('puzzleMetrics', {
		size: 55,
		space: 8
	});


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map