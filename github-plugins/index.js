/**================================
 * Installs a WordPress plugin
 **===============================*/

// Requirements
var util         = require('util'),
	path         = require('path'),
	yeoman       = require('yeoman-generator'),
	wordpress    = require('../util/wordpress'),
	art          = require('../util/art'),
	Logger       = require('../util/log'),
	Config       = require('../util/config');

// Export the module
module.exports = Generator;

// Extend the base generator
function Generator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	// Log level option
	this.option('log', {
		desc: 'The log verbosity level: [ verbose | log | warn | error ]',
		defaults: 'log',
		alias: 'l',
		name: 'level'
	});

	// Enable advanced features
	this.option('advanced', {
		desc: 'Makes advanced features available',
		alias: 'a'
	});

	// Shortcut for --log=verbose
	this.option('verbose', {
		desc: 'Verbose logging',
		alias: 'v'
	});
	if (this.options.verbose) {
		this.options.log = 'verbose';
	}

	// Setup the logger
	this.logger = Logger({
		level: this.options.log
	});

	// Log the options
	this.logger.verbose('\nOptions: ' + JSON.stringify(this.options, null, '  '));

	// Load the config files
	this.conf = new Config();

	// Success message
	this.on('end', function () {
		this.log.ok('Plugins installed.');
	}.bind(this));

};
util.inherits(Generator, yeoman.generators.Base);

// Nice and simple
Generator.prototype.plugItInPlugItIn = function() {

	var done = this.async(),
		me = this;

	// Display welcome message
	this.logger.log(art.wp, {logPrefix: ''});
	
	// (function getInput() {
	// 	me.prompt({
	// 		message: 'Which WordPress plugins would you like to install? (enter a comma-delimited list)',
	// 		name: 'plugins',
	// 		filter: function(input) {
	// 			var plugins = [],
	// 				items = input.split(',');
	// 			for (var i in items) {
	// 				plugins.push(items[i].trim());
	// 			}
	// 			return plugins;
	// 		}
	// 	}, function(input) {
	// 		var plugins = input.plugins;
	// 		var len = plugins.length;
	// 		var next = function(i) {
	// 			installPlugin(plugins[i], function() {
	// 				if (i < len - 1) {
	// 					next(++i);
	// 				} else {
	// 					done();
	// 				}
	// 			});
	// 		};
	// 		next(0);
	// 	});
	// })();
	// 
	// function installPlugin(plugin, cb) {
	// 	me.tarball('https://downloads.wordpress.org/plugin/' + plugin + '.zip', path.join(me.conf.get('contentDir') || 'wp-content', 'plugins', plugin), cb);
	// }
	
	(function getInput2() {
		me.prompt({
			message: 'Which GitHub plugins would you like to install? (enter a comma-delimited list of {username/repository}):',
			name: 'plugins2',
			filter: function(input) {
				var plugins2 = [],
					items = input.split(',');
				for (var i in items) {
					plugins2.push(items[i].trim());
				}
				return plugins2;
			}
		}, function(input) {
			var plugins2 = input.plugins2;
			var len = plugins2.length;
			var next = function(i) {
				installPlugin2(plugins2[i], function() {
					if (i < len - 1) {
						next(++i);
					} else {
						done();
					}
				});
			};
			next(0);
		});
	})();
	
	function installPlugin2(plugin2, cb2) {
		me.tarball('https://github.com/' + plugin2 + '/archive/master.zip', path.join(me.conf.get('contentDir') || 'wp-content', 'plugins', plugin2), cb2);
	}

};
