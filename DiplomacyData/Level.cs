using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Newtonsoft.Json;

namespace DiplomacyData
{
    public class Level : DirtyCheck
    {
        private string id = Game.NewId();
        public string Id
        {
            get { return id; }
        }

        public string Name
        {
            get;
            set;
        }

        public string Path
        {
            get;
            set;
        }

        public List<Country> Countries
        {
            get;
            set;
        }

        public Level()
            : this("")
        {
            Countries = new List<Country>();
        }

        public Level(string name)
        {
            Name = name;
            Countries = new List<Country>();
        }

        static public Level FromFile(string path)
        {
            StreamReader reader = new StreamReader(path);

            Level level = JsonConvert.DeserializeObject<Level>(reader.ReadToEnd());
            return level;
        }
    }
}
