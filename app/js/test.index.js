/**
 * @author aelyseev
 * @date 05/01/16
 */

var context;

require('./app');

context = require.context('./', true, /spec\.js$/);
context.keys().forEach(context);
