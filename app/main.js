/**
 * @author aelyseev
 * @date 15/12/15
 */

var app = require('./js/app');

// styles
require('./style/index.styl');

// config
require('./js/config');

// controllers
require('./js/menu/controller');
require('./js/game/controller');

//settings
require('./js/services/settings');
require('./js/services/puzzle-metrics');
