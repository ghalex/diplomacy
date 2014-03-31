using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Serialization;
using System.Reflection;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Collections;

namespace DiplomacyData
{
    public class GameContractResolver : DefaultContractResolver
    {
        private bool resetDirtyFlag;
        private bool full;

        public GameContractResolver(bool resetDirtyFlag = true, bool full = false)
        {
            this.resetDirtyFlag = resetDirtyFlag;
            this.full = full;
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);
            property.ShouldSerialize = instance => 
            {
                if (full)
                    return true;

                var obj = instance as DirtyCheck;

                if (obj != null)
                {
                    if (!(typeof(DirtyCheck).IsAssignableFrom(property.PropertyType) || 
                        typeof(IList).IsAssignableFrom(property.PropertyType) || property.PropertyName == "Id"))
                    {
                        bool isDirty = obj.IsDirty(property.PropertyName);

                        if (resetDirtyFlag)
                        {
                            obj.SetDirty(property.PropertyName, false);
                        }

                        return isDirty;
                    }                
                }
                
                return true;
            };
            
            return property;
        }
    }
}
