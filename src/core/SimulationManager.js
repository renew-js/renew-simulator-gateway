class SimulationManager {

    constructor (serverManager, pluginManager) {
        this.serverManager = serverManager;
        this.pluginManager = pluginManager;
        this.registerHandlers();
    }

    registerHandlers () {
        this.serverManager.registerHandlers((socket) => {
            socket.on('simulation.init', (formalism, data) => {
                this.getPlugin(formalism.plugin)
                    .initSimulation(formalism.id, data);
            });

            socket.on('simulation.step', (formalism) => {
                this.getPlugin(formalism.plugin)
                    .step();
            });
        });
    }

    initSimulation () {

    }

    terminateSimulation () {

    }

    getPlugin (pluginName) {
        return this.pluginManager.getPlugin(pluginName);
    }

}

module.exports = SimulationManager;
