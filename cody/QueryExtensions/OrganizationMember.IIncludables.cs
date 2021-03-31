using Microsoft.EntityFrameworkCore;
using QueryableOrganizationMember = System.Linq.IQueryable<Cody.Models.Organizations.OrganizationMember>;
using IncludableOrganization = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.OrganizationMember, Cody.Models.Organizations.Organization>;
using IncludableUser = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.OrganizationMember, Cody.Models.Users.UserAccount>;
using IncludableOrganizationState = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.OrganizationMember, Cody.Models.Organizations.OrganizationState>;
using IncludableLogo = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.OrganizationMember, Cody.Models.Organizations.OrganizationLogo>;
using IncludableCover = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Organizations.OrganizationMember, Cody.Models.Organizations.OrganizationCover>;


namespace Cody.QueryExtensions
{
    public static class OrganizationMemberQueries
    {
        public static IncludableOrganization IncludingOrganization(this QueryableOrganizationMember self)
        {
            return self.Include(om => om.Organization);
        }

        public static IncludableUser IncludingUser(this QueryableOrganizationMember self)
        {
            return self.Include(om => om.UserAccount);
        }


        public static IncludableOrganizationState WithState(this IncludableOrganization org)
        {
            return org.ThenInclude(o => o.State);
        }

        public static IncludableLogo WithLogo(this IncludableOrganization org)
        {
            return org
                .ThenInclude(o => o.Detail)
                .ThenInclude(od => od.Logo);
        }

        public static IncludableCover WithCover(this IncludableOrganization org)
        {
            return org
                .ThenInclude(o => o.Detail)
                .ThenInclude(od => od.Cover);
        }
    }
}
