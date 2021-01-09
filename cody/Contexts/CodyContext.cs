using cody.Models;
using Microsoft.EntityFrameworkCore;

namespace cody.Contexts
{
    public sealed class CodyContext : DbContext
    {
        public CodyContext(DbContextOptions<CodyContext> options)
            : base(options)
        { }

        public DbSet<UserAccount> UsersAccounts { get; set; }
        public DbSet<UserAccountDetail> UserDatails { get; set; }
        public DbSet<SchoolAccount> Schools { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigurePasswordHashing(modelBuilder);
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
    }
}
