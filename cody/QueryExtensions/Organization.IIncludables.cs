using Cody.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using IncludableState = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organization, Cody.Models.OrganizationState>;
using IncludableMembers = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organization, System.Collections.Generic.List<Cody.Models.OrganizationMember>>;
using IncludableDetail = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organization, Cody.Models.OrganizationDetail>;
using IncludableCover = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organization, Cody.Models.Organizations.OrganizationCover>;
using IncludableLogo = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organization, Cody.Models.Organizations.OrganizationLogo>;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationQueries
    {
        public static IncludableState IncludingState(this IQueryable<Organization> self)
        {
            return self.Include(o => o.State);
        }


        public static IncludableMembers IncludingMembers(this IQueryable<Organization> self)
        {
            return self.Include(o => o.Members);
        }


        public static IncludableDetail IncludingDetail(this IQueryable<Organization> self)
        {
            return self.Include(o => o.Detail);
        }

        public static IncludableCover IncludingCover(this IQueryable<Organization> self)
        {
            return self
                .Include(o => o.Detail)
                .ThenInclude(od => od.Cover);
        }

        public static IncludableLogo IncludingLogo(this IQueryable<Organization> self)
        {
            return self
                .Include(o => o.Detail)
                .ThenInclude(od => od.Logo);
        }
    }
}
