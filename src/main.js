const ServerManager = require('./core/ServerManager');
const PluginManager = require('./core/PluginManager');

const serverConfig = require('./config/server.js');
const pluginsConfig = require('./config/plugins.js');

const serverManager = new ServerManager(serverConfig);
const pluginManager = new PluginManager(serverManager);

pluginsConfig.forEach((plugin) => {
    pluginManager.register(plugin);
});

pluginManager.initialize().then(() => serverManager.attach());
