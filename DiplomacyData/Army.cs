using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DiplomacyData
{
    public class Army : DirtyCheck
    {
        private string id = Game.NewId();
        public string Id
        {
            get { return id; }
        }

        public int Infantry
        {
            get;
            set;
        }

        public int Cavalary
        {
            get;
            set;
        }

        public int Artillery
        {
            get;
            set;
        }
    }
}
