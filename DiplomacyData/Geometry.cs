using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DiplomacyData
{
    public class Geometry : DirtyCheck
    {
        private string id = Game.NewId();
        public string Id
        {
            get { return id; }
        }

        public string Type
        {
            get;
            set;
        }

        public string Color
        {
            get;
            set;
        }

        public string Coordinates
        {
            get;
            set;
        }

        public LatLng Center
        {
            get;
            set;
        }

        public Geometry()
        {
        }

        public Geometry(string coords)
        {
            this.Coordinates = coords;
        }
    }


}
