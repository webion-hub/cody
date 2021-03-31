using Cody.Models;
using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses.Formatters
{
    internal class UsersResponseFormatter : ResponseFormatter<UserAccount>
    {
        public UsersResponseFormatter(UserAccount caller, IQueryable<UserAccount> values) 
            : base(caller, values)
        {}


        public override IQueryable<object> Format()
        {
            return
                from u in Values
                let ad = u.AccountDetail
                let o = u.Organizations
                let s = u.AccountState
                let pp = ad.ProfilePicture

                orderby u.Id ascending
                select new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    State = new
                    {
                        s.IsEmailVerified,
                        s.HasBeenDeleted,
                    },
                    JoinedOrganizations = o.Count,
                    Detail = new
                    {
                        ad.Name,
                        ad.Surname,
                        ad.BirthDate,
                        ad.RegistrationDate,
                    },
                    ProfilePicture = pp == null ? null : new
                    {
                        pp.FilePath,
                    },
                };
        }
    }
}
