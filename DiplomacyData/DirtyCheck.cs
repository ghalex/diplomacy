using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DiplomacyData
{
    public abstract class DirtyCheck
    {
        private Dictionary<string, bool> dirty = new Dictionary<string,bool>();
        private DirtyCheck parent = null;

        public DirtyCheck()
            : this(null)
        {
        }

        public DirtyCheck(DirtyCheck parent)
        {
            this.parent = parent;
        }

        public void SetDirty(string propertyName, bool value)
        {
            dirty[propertyName] = value;
        }

        public bool IsDirty(string propertyName)
        {
            if (!dirty.ContainsKey(propertyName))
            {
                return true;
            }

            return dirty[propertyName];
        }
    }
}
