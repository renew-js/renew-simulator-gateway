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

            socket.on('simulation.start', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .start();
            });

            socket.on('simulation.step', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .step();
            });

            socket.on('simulation.stop', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .stop();
            });

            socket.on('simulation.terminate', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .terminate();
            });

            socket.on('marking.get', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .getMarking();
            });
        });
    }

    getPlugin (pluginName) {
        return this.pluginManager.getPlugin(pluginName);
    }

}

module.exports = SimulationManager;
