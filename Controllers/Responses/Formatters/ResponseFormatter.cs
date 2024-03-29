﻿using Cody.Db.Models.Users;
using Cody.Security.Authorization;
using System.Linq;

namespace Cody.Controllers.Responses.Formatters
{
    internal abstract class ResponseFormatter<T>
    {
        protected UserAccount Caller { get; init; }
        protected IQueryable<T> Values { get; init; }

        protected UserRole? UserRole => Caller?.Role;
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
