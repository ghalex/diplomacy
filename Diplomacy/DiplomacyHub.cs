using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using DiplomacyData;
using System.Threading.Tasks;
using System.Reactive.Linq;

namespace Diplomacy
{
    public class DiplomacyHub : Hub
    {
        #region Connect/Disconnect
        
        public override Task OnConnected()
        {
            Clients.Caller.updateGames(GameManager.Instance.Games);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            Game game = GameManager.Instance.FindGameByClient(Context.ConnectionId);

            if (game != null)
            {
                game.Leave(Context.ConnectionId);
            }

            return base.OnDisconnected();
        }

        #endregion

        public string NewGame()
        {
            Level level = Level.FromFile(HttpContext.Current.Server.MapPath("~/Web/shapes/test_level.js"));
            Game game = GameManager.Instance.CreateGame(Clients, Groups, level);

            // Join & Run game
            game.Join(Context.ConnectionId);
            game.Run(1);

            // Inform clients to update games list
            Clients.All.updateGames(GameManager.Instance.Games);

            return game.Id;
        }

        public void JoinGame(string gameId)
        {
            Game game = GameManager.Instance.FindGame(gameId);
            game.Join(Context.ConnectionId);
        }

        public void LeaveGame(string gameId)
        {
            Game game = GameManager.Instance.FindGame(gameId);
            game.Leave(Context.ConnectionId);
        }

        public void RunGame(string gameId, int unitOfTime)
        {
            Game game = GameManager.Instance.FindGame(gameId);
            game.Run(unitOfTime);

            // Inform clients to update games list
            Clients.All.updateGames(GameManager.Instance.Games);
        }

        public void StopGame(string gameId)
        {
            Game game = GameManager.Instance.FindGame(gameId);
            game.Stop();

            // Inform clients to update games list.
            Clients.All.updateGames(GameManager.Instance.Games);
        }

        public void DeleteGame(string gameId)
        {
            GameManager.Instance.DeleteGame(gameId);
            Clients.Caller.updateGames(GameManager.Instance.Games);
        }

        public void Test(string gameId)
        {
            Game game = GameManager.Instance.FindGame(gameId);
            Geometry geometry = game.Level.Countries[0].Regions[0].Geometry;

            geometry.Color = geometry.Color != "#FF0000" ? "#FF0000" : "#00FF00";
            geometry.SetDirty("Color", true);

        }
    }
}
