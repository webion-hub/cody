using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    public static class GetOrganizationResponse
    {
        public static IQueryable<object> AsResponse(this IQueryable<Organization> self)
        {
            return
                from o in self
                let s = o.State
                let d = o.Detail
                let m = o.Members

                orderby o.Id ascending
                select new
                {
                    o.Id,
                    o.Name,
                    State = new
                    {
                        s.HasBeenVerified,
                    },
                    Kind = o.Kind.ToString(),
                    Detail = new
                    {
                        d.City,
                        d.Country,
                        d.Description,
                        d.Website,
                    },
                    MembersCount = m.Count,
                };
        }
    }
}
