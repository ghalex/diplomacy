using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace DiplomacyData
{
    public class Country : DirtyCheck, INotifyPropertyChanged
    {
        #region Fields
        #endregion

        #region Properties

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

        public List<Region> Regions
        {
            get;
            set;
        }

        #endregion

        #region Initialization
        
        public Country()
        {
        }

        #endregion

        #region Events
        
        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged(string propertyName)
        {
            if (PropertyChanged != null)
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }

        #endregion

    }
}
