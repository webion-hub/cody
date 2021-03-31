using Cody.Models;
using Cody.Security.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses.Formatters
{
    internal abstract class ResponseFormatter<T>
    {
        protected UserAccount Caller { get; init; }
        protected IQueryable<T> Values { get; init; }

        protected string UserRole => Caller?.AccountRole.Name;
        protected int? CallerId => Caller?.Id;
        protected bool IsCallerAnAdmin => RolesManager.IsUserAdmin(Caller);


        public ResponseFormatter(UserAccount caller, IQueryable<T> values)
        {
            Caller = caller;
            Values = values;
        }

        public abstract IQueryable<object> Format();
    }
}
