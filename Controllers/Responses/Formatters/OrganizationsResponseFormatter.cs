using Cody.Db.Models;
using Cody.Db.Models.Organizations;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
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
                let om = m.Where(om => om.UserAccountId == CallerId)

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

                    IsBookmarked = om.Any(m => m.IsBookmarked),
                    IsCallerAMember = om.Any(),
                };
        }
    }
}
