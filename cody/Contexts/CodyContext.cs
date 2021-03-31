﻿using Cody.Models;
using Cody.Models.Organizations;
using Cody.Security;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        public DbSet<UserPreferredTheme> PreferredThemes { get; set; }


        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OrganizationCover> OrganizationCovers { get; set; }
        public DbSet<OrganizationLogo> OrganizationLogos { get; set; }
        public DbSet<OrganizationMember> OrganizationMembers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureDefaultValues(modelBuilder);
            ConfigureOrganizationMembership(modelBuilder);
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
