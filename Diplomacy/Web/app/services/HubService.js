/*jslint vars: true, sloppy: true, nomen: true */
/*global define, console */

define(['jquery', 'jquery.connection', 'phi-core'], function ($, connection, PHI) {
    
    
    var HubService = function () {
        this._connection = connection;
        this._hub = connection.diplomacyHub;
        
        this.isConnected = false;
        this.events = new PHI.EventDispatcher();
    };
    
    HubService.prototype = {
        
        connect: function () {
            this._hub.connection.start();
            
            this.isConnected = true;
            this.events.fire('connected');
        },
        
        disconnect: function () {
            this._hub.connection.stop();
            this.isConnected = false;
            
            this.events.fire('disconnected');
        },
        
        client: function () {
            return this._hub.client;
        },
        
        server: function () {
            return this._hub.server;
        },
        
        newGame: function () {
            this.server().newGame();
        },
        
        joinGame: function (gameId) {
            this.server().joinGame(gameId);
        },

        leaveGame: function (gameId) {
            this.server().leaveGame(gameId);
        },
        
        runGame: function (gameId) {
            this.server().runGame(gameId, 1);
        },
        
        stopGame: function (gameId) {
            this.server().stopGame(gameId);
        },
        
        deleteGame: function (gameId) {
            this.server().deleteGame(gameId);
        }
    };
    
    return HubService;
});