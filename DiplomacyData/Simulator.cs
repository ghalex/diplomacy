using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace DiplomacyData
{
    public class Simulator
    {

        public void Run(List<Country> countries)
        {
            foreach (Country country in countries)
                Run(country);
        }

        public void Run(Country country)
        {
            //country.Reset();

            //foreach (Region region in country.Regions)
            //{
                // Calculate Region Income & Expenses
                // Income
                //region.Income = region.Tax + (region.Tax * region.TaxBonus);
                //region.Income += region.Trade + (region.Trade * region.TradeBonus);
                
                //// Expenses
                //region.Expenses = region.BuildingsMaintenance;

                //// Calculate Country Income & Expenses
                //// Income
                //country.Taxes += region.Tax + (region.Tax * region.TaxBonus);
                //country.Trade += region.Trade + (region.Trade * region.TradeBonus);                

                //// Expenses
                //country.BuildingsMaintenance += region.BuildingsMaintenance;
                                
            //}

            //country.Income = country.Taxes + country.Trade;
            //country.Expenses = country.BuildingsMaintenance + country.ArmyMaintenance;

            //country.GoldPerMonth = (float)Math.Round((country.Income - country.Expenses), 3);
            //country.Gold = (float)Math.Round((country.Gold + country.GoldPerMonth + 0.3333f), 3);
        }
    }
}
