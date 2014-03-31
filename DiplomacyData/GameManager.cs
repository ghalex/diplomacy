using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR;

namespace DiplomacyData
{
    public class GameManager
    {
        #region Singleton
        
        private static GameManager instance;
        private static object lockObject = new Object();

        #endregion

        #region Properties

        public List<Game> Games
        {
            get;
            set;
        }

        #endregion

        #region Initialization

        private GameManager()
        {
            Games = new List<Game>();
        }

        public static GameManager Instance
        {
            get
            {
                lock (lockObject)
                {
                    if (instance == null)
                        instance = new GameManager();
                }                

                return instance;
            }
        }

        #endregion

        #region Methods

        public Game CreateGame(IHubConnectionContext clients, IGroupManager groups, Level level)
        {
            Game game = new Game(clients, groups, level);
            
            // Store game
            Games.Add(game);

            return game;
        }

        public Game FindGame(string gameId)
        {
            return Games.Find((g) => g.Id == gameId);
        }

        public Game FindGameByClient(string clientId)
        {
            foreach (Game game in Games)
                if (game.ClientsIds.Exists(id => id == clientId))
                    return game;

            return null;
        }

        public void DeleteGame(string gameId)
        {
            Game game = FindGame(gameId);
            DeleteGame(game);            
        }

        public void DeleteGame(Game game)
        {
            game.Dispose();
            Games.Remove(game);
        }

        #endregion
    }
}
