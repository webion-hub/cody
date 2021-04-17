using Cody.Models;
using Cody.Models.Organizations;
using Cody.Models.Users;
using Cody.QueryExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses.Formatters
{
    internal class OrganizationsResponseFormatter : ResponseFormatter<Organization>
    {
        public OrganizationsResponseFormatter(UserAccount sender, IQueryable<Organization> values) 
            : base(sender, values)
        {}


        public override IQueryable<object> Format()
        {
            var organizations = IsCallerAnAdmin
                ? Values
                : Values
                    .ThatArePublic()
                    .ThatHaveNotBeenDeleted();

            return Format(organizations);
        }

        private IQueryable<object> Format(IQueryable<Organization> organizations)
        {
            return
                from o in organizations
                let s = o.State
                let d = o.Detail
                let m = o.Members
                let l = d.Logo
                let b = d.Cover

                orderby o.Id ascending
                select new
                {
                    o.Id,
                    o.Name,
                    State = new
                    {
                        s.HasBeenVerified,
                        s.HasBeenDeleted,
                        Visibility = s.Visibility.ToString(),
                        AccessCriteria = s.AccessCriteria.ToString(),
                    },
                    Kind = o.Kind.ToString(),
                    Detail = new
                    {
                        d.Location,
                        d.Description,
                        d.Website,
                    },
                    MembersCount = m.Count,
                    HasLogo = l != null,
                    HasCover = b != null,

                    IsBookmarked = CallerId != null && m
                        .Single(m => m.UserAccountId == CallerId)
                        .IsBookmarked,

                    IsCallerAMember =
                        CallerId != null && m.Any(m => m.UserAccountId == CallerId),
                };
        }
    }
}
