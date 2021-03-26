using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QueryableOrganization = System.Linq.IQueryable<Cody.Models.Organization>;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationQueries
    {
        public static QueryableOrganization ThatArePublic(this QueryableOrganization self)
        {
            return self.Where(o => o.State.Visibility == OrganizationVisibility.Public);
        }

        public static QueryableOrganization ThatArePrivate(this QueryableOrganization self)
        {
            return self.Where(o => o.State.Visibility == OrganizationVisibility.Private);
        }


        public static QueryableOrganization ThatHaveBeenVerified(this QueryableOrganization self)
        {
            return self.Where(o => o.State.HasBeenVerified);
        }

        public static QueryableOrganization ThatHaveNotBeenVerified(this QueryableOrganization self)
        {
            return self.Except(self.ThatHaveBeenVerified());
        }


        public static QueryableOrganization ThatHaveBeenDeleted(this QueryableOrganization self)
        {
            return self.Where(o => o.State.HasBeenDeleted);
        }

        public static QueryableOrganization ThatHaveNotBeenDeleted(this QueryableOrganization self)
        {
            return self.Except(self.ThatHaveBeenDeleted());
        }


        public static QueryableOrganization ThatHaveOpenAccess(this QueryableOrganization self)
        {
            return self.Where(o => o.State.AccessCriteria == OrganizationAccessCriteria.Open);
        }

        public static QueryableOrganization ThatAreOnInvite(this QueryableOrganization self)
        {
            return self.Where(o => o.State.AccessCriteria == OrganizationAccessCriteria.OnInvite);
        }
    }
}
