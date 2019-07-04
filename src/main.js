const ServerManager = require('./core/ServerManager');
const PluginManager = require('./core/PluginManager');
const SimulationManager = require('./core/SimulationManager');

const serverConfig = require('./config/server.js');
const pluginsConfig = require('./config/plugins.js');

const serverManager = new ServerManager(serverConfig);
const pluginManager = new PluginManager(serverManager);
const simualtionManager = new SimulationManager(serverManager, pluginManager);

pluginsConfig.forEach((plugin) => {
    pluginManager.registerPlugin(plugin);
});

pluginManager.initPlugins();
