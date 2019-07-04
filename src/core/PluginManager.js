class PluginManager {

    constructor (serverManager) {
        this.serverManager = serverManager;
        this.plugins = {};
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            socket.emit('plugin.list', Object.values(this.plugins));
        });
    }

    registerPlugin (plugin) {
        this.plugins[plugin.name] = plugin;
    }

    getPlugin (pluginName) {
        return this.plugins[pluginName];
    }

    initPlugins () {
        Object.values(this.plugins).forEach((plugin) => {
            console.log(`PluginManager: Initializing ${plugin.name} ...`);
            plugin.initPlugin(this.serverManager);
        });
    }

}

module.exports = PluginManager;
