/**
 * @author aelyseev
 * @date 15/12/15
 */

var app = require('./js/app');

// styles
require('./style/index.styl');
require('./images/icons.styl');

// config
require('./js/config');

// controllers
require('./js/features/menu/controller');
require('./js/features/game/controller');

//settings
require('./js/services/settings');
require('./js/services/puzzle-metrics');
