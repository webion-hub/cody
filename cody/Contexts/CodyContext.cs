using Cody.Models;
using Cody.Security;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<SchoolAccount> Schools { get; set; }
        public DbSet<UserProfilePicture> ProfilePictures { get; set; }
        public DbSet<UserAccountRole> Roles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigurePasswordHashing(modelBuilder);
            ConfigureDefaultValues(modelBuilder);
        }

        private static void ConfigurePasswordHashing(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<UserAccount>()
                .Property(u => u.Password)
                .HasConversion(
                    pw => Password.CreateFrom(pw),
                    pw => pw
                );
        }

        private static void ConfigureDefaultValues(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<UserAccountState>()
                .Property(b => b.IsEmailValid)
                .HasDefaultValue(false);
        }
    }
}
