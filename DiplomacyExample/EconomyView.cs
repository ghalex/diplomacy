using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using DiplomacyData;

namespace DiplomacyExample
{
    public partial class EconomyView : Form
    {
        private Country country;

        public EconomyView(Country country)
        {
            InitializeComponent();
            this.country = country;

            txtCountryGold.DataBindings.Add("Text", this.country, "Gold");

            listRegions.DataSource = country.Regions;
            listRegions.DisplayMember = "Name";
            listRegions.SelectedIndexChanged += new EventHandler(listRegions_SelectedIndexChanged);
            listRegions.SelectedItem = null;
            listRegions.SelectedIndex = 0;
        }

        void listRegions_SelectedIndexChanged(object sender, EventArgs e)
        {
            var region = (Region)(listRegions.SelectedItem);

            if (region != null)
            {
                txtTax.DataBindings.Clear();
                txtTax.DataBindings.Add("Text", region, "Tax");

                txtTaxBonus.DataBindings.Clear();
                txtTaxBonus.DataBindings.Add("Text", region, "TaxBonus");

                txtBalance.DataBindings.Clear();
                txtBalance.DataBindings.Add("Text", region, "Balance");

                txtBExpensive.DataBindings.Clear();
                txtBExpensive.DataBindings.Add("Text", region, "BuildingsMaintenance");
            }
        }

    }
}
