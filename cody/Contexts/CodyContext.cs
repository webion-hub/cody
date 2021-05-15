using Cody.Models;
using Cody.Models.Organizations;
using Cody.Models.Users;
using Microsoft.EntityFrameworkCore;
using Courses = Cody.Models.Organizations.Courses;

namespace Cody.Contexts
{
    public sealed class CodyContext : DbContext
    {
        public CodyContext(DbContextOptions<CodyContext> options)
            : base(options)
        { }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<UserAccountPersistentLoginCookie> LoginCookies { get; set; }
        public DbSet<UserAccountDetail> UserDetails { get; set; }
        public DbSet<UserProfilePicture> ProfilePictures { get; set; }
        public DbSet<UserAccountRole> Roles { get; set; }
        public DbSet<UserBiography> Biographies { get; set; }
        public DbSet<PreferredTheme> PreferredThemes { get; set; }


        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OrganizationCover> OrganizationCovers { get; set; }
        public DbSet<OrganizationLogo> OrganizationLogos { get; set; }
        public DbSet<OrganizationMember> OrganizationMembers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigurePrimaryKeys(modelBuilder);
            ConfigureDefaultValues(modelBuilder);
            ConfigureOrganizationMembership(modelBuilder);
        }


        private static void ConfigurePrimaryKeys(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<BookmarkedOrganization>()
                .HasKey(fo => new { fo.UserAccountId, fo.OrganizationId });

            modelBuilder
                .Entity<Courses.Member>()
                .HasKey(cm => new { cm.UserAccountId, cm.CourseId });
        }


        private static void ConfigureDefaultValues(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<UserAccountState>()
                .Property(b => b.IsEmailVerified)
                .HasDefaultValue(false);

            modelBuilder
                .Entity<UserAccountState>()
                .Property(b => b.HasBeenDeleted)
                .HasDefaultValue(false);

            modelBuilder
                .Entity<OrganizationState>()
                .Property(b => b.HasBeenDeleted)
                .HasDefaultValue(false);
        }

        private static void ConfigureOrganizationMembership(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<OrganizationMember>()
                .HasKey(om => new { om.OrganizationId, om.UserAccountId });

            modelBuilder
                .Entity<OrganizationMember>()
                .HasOne(om => om.Organization)
                .WithMany(o => o.Members)
                .HasForeignKey(om => om.OrganizationId);

            modelBuilder
                .Entity<OrganizationMember>()
                .HasOne(om => om.UserAccount)
                .WithMany(u => u.Organizations)
                .HasForeignKey(om => om.UserAccountId);
        }
    }
}
