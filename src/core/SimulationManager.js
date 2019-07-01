class SimulationManager {

    constructor (serverManager, pluginManager) {
        this.serverManager = serverManager;
        this.pluginManager = pluginManager;
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            socket.on('simulation.start', this.start.bind(this));
        });
    }

    start (formalism, data) {
        const plugin = this.pluginManager.getPlugin(formalism.plugin);
        plugin.start(formalism.id, data);
    }

}

module.exports = SimulationManager;
