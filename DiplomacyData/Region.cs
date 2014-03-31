using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace DiplomacyData
{
    public class Region : DirtyCheck, INotifyPropertyChanged
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

        public List<Building> Buildings
        {
            get;
            set;
        }

        public List<Army> Armies
        {
            get;
            set;
        }

        public int Population
        {
            get;
            set;
        }

        public float PopulationGrow
        {
            get;
            set;
        }

        public float PopulationGrowValue
        {
            get;
            set;
        }

        public float Happiness
        {
            get;
            set;
        }

        public float IncomePerP
        {
            get;
            set;
        }

        public float Tax
        {
            get;
            set;
        }

        public float TaxPerP
        {
            get;
            set;
        }

        public float TaxM
        {
            get;
            set;
        }

        public Geometry Geometry
        {
            get;
            set;
        }

        #endregion

        #region Initialization
        
        public Region()
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
