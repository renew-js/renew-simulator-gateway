class SimulationManager {

    constructor (serverManager, pluginManager) {
        this.serverManager = serverManager;
        this.pluginManager = pluginManager;
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            let activePlugin = null;

            socket.on('simulation.init', (
                formalism,
                netInstance,
                serializedData
            ) => {
                activePlugin = this.getPlugin(formalism.plugin)
                activePlugin.initSimulation(
                    formalism.id,
                    netInstance,
                    serializedData
                );
            });

            socket.on('simulation.start', () => {
                activePlugin.start();
            });

            socket.on('simulation.step', () => {
                activePlugin.step();
            });

            socket.on('simulation.stop', () => {
                activePlugin.stop();
            });

            socket.on('simulation.terminate', () => {
                activePlugin.terminate();
            });

            socket.on('marking.get', () => {
                activePlugin.getMarking();
            });
        });
    }

    getPlugin (pluginName) {
        return this.pluginManager.getPlugin(pluginName);
    }

}

module.exports = SimulationManager;
