using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNet.SignalR.Hubs;
using System.Reactive.Linq;
using Microsoft.AspNet.SignalR;
using DiplomacyData.Buildings;
using System.IO;
using Newtonsoft.Json;

namespace DiplomacyData
{
    public class Game : DirtyCheck, IDisposable
    {
        #region Fields
        
        private IObservable<long> when;
        private IDisposable subscriber;        

        private IHubConnectionContext clients;
        private IGroupManager groups;
        private List<string> clientsIds = new List<string>();

        private Simulator simulator = new Simulator();

        #endregion

        #region Properties

        private string id = "game_" + Game.NewId();
        public string Id
        {
            get { return id; }
        }

        public bool IsRunning
        {
            get;
            private set;
        }

        [JsonIgnore]
        public List<string> ClientsIds
        {
            get { return clientsIds; }
        }

        public Level Level
        {
            get;
            set;
        }

        public int GameTime
        {
            get;
            set;
        }

        #endregion

        #region Initialization
        
        public Game(IHubConnectionContext clients, IGroupManager groups, Level level)
        {
            this.clients = clients;
            this.groups = groups;

            this.GameTime = 0;
            this.Level = level;


        }

        static public string NewId()
        {
            return Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        }

        #endregion

        #region Methods
        
        public void Run(int gameSpeed)
        {
            if (!IsRunning)
            {
                IsRunning = true;

                when = Observable.Interval(TimeSpan.FromSeconds(gameSpeed));
                subscriber = when.Subscribe((x) =>
                {
                    GameTime++;
                    SetDirty("GameTime", true);

                    var game = JsonConvert.DeserializeObject(this.ToJSON());
                    clients.Group(Id).updateGame(game);
                });
            }         
        }

        public void Stop()
        {
            IsRunning = false;
            subscriber.Dispose();
        }

        public void Join(string clientId)
        {
            groups.Add(clientId, Id);
            
            clientsIds.Add(clientId);
            clients.Client(clientId).joinGame(JsonConvert.DeserializeObject(this.ToJSON(true)));
        }

        public void Leave(string clientId)
        {
            clients.Client(clientId).leaveGame();

            groups.Remove(clientId, Id);
            clientsIds.Remove(clientId);
        }

        public void Dispose()
        {
            foreach (string userId in clientsIds)
                groups.Remove(userId, Id);

            clientsIds.Clear();
            subscriber.Dispose();

            IsRunning = false;
        }

        public string ToJSON(bool full = false)
        {
            string json = JsonConvert.SerializeObject(this, Formatting.None, new JsonSerializerSettings { ContractResolver = new GameContractResolver(resetDirtyFlag: true, full: full) });
            return json;
        }

        #endregion
    }
}
