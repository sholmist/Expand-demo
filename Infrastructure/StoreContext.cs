using System.Reflection;
using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    //Ctrl + . to add using statement
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Requirement> Requirements { get; set; }
        public DbSet<Learning> Learnings { get; set; }
        public DbSet<Basket> Baskets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.Entity<IdentityRole>()
            .HasData(new IdentityRole
            {
                Name = "Student",
                NormalizedName = "STUDENT"
            }, new IdentityRole
            {
                Name = "Instructor",
                NormalizedName = "INSTRUCTOR"
            });
        }
    }
}