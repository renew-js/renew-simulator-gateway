class SimulationManager {

    constructor (serverManager, pluginManager) {
        this.serverManager = serverManager;
        this.pluginManager = pluginManager;
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            socket.on('simulation.init', (
                formalism,
                netInstance,
                serializedData
            ) => {
                this.getPlugin(formalism.plugin)
                    .initSimulation(formalism.id, netInstance, serializedData);
            });

            socket.on('simulation.step', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .step();
            });

            socket.on('simulation.terminate', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .terminateRun();
            });
        });
    }

    getPlugin (pluginName) {
        return this.pluginManager.getPlugin(pluginName);
    }

}

module.exports = SimulationManager;
