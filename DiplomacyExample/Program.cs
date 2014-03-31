using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DiplomacyData;
using System.Reactive;
using System.Reactive.Linq;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using DiplomacyData.Buildings;
using System.Threading.Tasks;

namespace DiplomacyExample
{
    class Program
    {      
        [STAThread]
        static void Main(string[] args)
        {
            int unitOfTime = 1;
            Simulator simulator = new Simulator();
            Country romania = new Country();

            //romania.Regions.Add(new Region("Timisoara", 4, 0.10f, 0, 0));
            //romania.Regions.Add(new Region("Arad", 3, 0, 0, 0));
            //romania.Regions.Add(new Region("Petrosani", 3, 0, 0, 0));

            //romania.Regions.First().Buildings.Add(new Farm());
            //romania.Regions.First().Buildings.Add(new Market());

            //

            var form = new EconomyView(romania);

            //IObservable<long> when = Observable.Interval(TimeSpan.FromSeconds(unitOfTime));
            //when.Subscribe((x) => {

            //    form.Invoke((Action)(() => {
            //        simulator.Run(new List<Country>() { romania });
            //    }));

            //});

            System.Windows.Forms.Application.EnableVisualStyles();            
            Application.Run(form);
            
        }
    }
}
 