using cody.Models;
using Microsoft.EntityFrameworkCore;

namespace cody.Contexts
{
    public sealed class CodyContext : DbContext
    {
        public CodyContext(DbContextOptions<CodyContext> options)
            : base(options)
        { }


        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .Property(u => u.Password)
                .HasConversion(
                    pw => Password.CreateFrom(pw),
                    pw => pw
                );
        }
    }
}
