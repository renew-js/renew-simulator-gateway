/**
 * @abstract
 */
class AbstractPlugin {

    constructor () {
        this.name = this.getName();
        this.provides = this.getProvidedFormalisms();
        this.netInstance = null;
        this.places = null;
    }

    initPlugin (serverManager) {
        serverManager.registerHandlers(this.registerHandlers.bind(this));
    }

    indexPlaces () {
        this.places = this.netInstance.elements.filter((element) => {
            return element.metaObject
                && element.metaObject.targetType === 'place';
        });
    }

    sendError (socket, data) {
        socket.emit('simulation.error', data);
    }

    sendMarking (socket, data) {
        socket.emit('marking.update', data);
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
