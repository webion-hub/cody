using System.Linq;
using Microsoft.EntityFrameworkCore;
using IncludableState = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.Organization, Cody.Models.Organizations.OrganizationState>;
using IncludableMembers = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.Organization, System.Collections.Generic.List<Cody.Models.Organizations.OrganizationMember>>;
using IncludableDetail = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.Organization, Cody.Models.Organizations.OrganizationDetail>;
using IncludableCover = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.Organization, Cody.Models.Organizations.OrganizationCover>;
using IncludableLogo = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.Organization, Cody.Models.Organizations.OrganizationLogo>;
using Cody.Models.Organizations;

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
