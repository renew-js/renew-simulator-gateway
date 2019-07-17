/**
 * @abstract
 */
class AbstractPlugin {

    constructor () {
        this.name = this.getName();
        this.provides = this.getProvidedFormalisms();
        this.netInstance = null;
    }

    initPlugin (serverManager) {
        serverManager.registerHandlers(this.registerHandlers.bind(this));
    }

    sendError (socket, data) {
        socket.emit('simulation.error', data);
    }

    sendMarking (socket, data) {
        socket.emit('marking.update', data);
    }

    sendInitialized (socket) {
        socket.emit('simulation.initialized');
    }

    /**
     * @abstract
     */
    getName () {
    }

    /**
     * @abstract
     */
    getProvidedFormalisms () {
    }

    /**
     * @abstract
     */
    registerHandlers (socket) {
    }

    /**
     * @abstract
     */
    initSimulation (formalismId, netInstance, serializedData) {
    }

    /**
     * @abstract
     */
    start () {
    }

    /**
     * @abstract
     */
    step () {
    }

    /**
     * @abstract
     */
    stop () {
    }

    /**
     * @abstract
     */
    terminate () {
    }

    /**
     * @abstract
     */
    getMarking () {
    }

}

module.exports = AbstractPlugin;
