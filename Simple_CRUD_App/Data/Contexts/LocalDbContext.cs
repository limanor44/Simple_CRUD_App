using Microsoft.EntityFrameworkCore;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;

namespace Simple_CRUD_App.Data.Contexts
{
    public class LocalDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public LocalDbContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .SetBasePath(Directory.GetCurrentDirectory())
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("LocalDbConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
                new Contact { Id = 1, Name = "Иван Петров", JobTitle = "Senior Backend Developer", MobilePhone = "+79123456789", BirthDate = new DateTime(1990, 5, 15) },
                new Contact { Id = 2, Name = "Анна Смирнова", JobTitle = "Product Manager", MobilePhone = "+79234567890", BirthDate = new DateTime(1988, 11, 22) },
                new Contact { Id = 3, Name = "Алексей Козлов", JobTitle = "DevOps Engineer", MobilePhone = "+79345678901", BirthDate = new DateTime(1993, 3, 8) },
                new Contact { Id = 4, Name = "Мария Иванова", JobTitle = "Frontend Team Lead", MobilePhone = "+79456789012", BirthDate = new DateTime(1985, 7, 30) },
                new Contact { Id = 5, Name = "Дмитрий Соколов", JobTitle = "Data Scientist", MobilePhone = "+79567890123", BirthDate = new DateTime(1995, 12, 5) },
                new Contact { Id = 6, Name = "Екатерина Волкова", JobTitle = "UX/UI Designer", MobilePhone = "+79678901234", BirthDate = new DateTime(1991, 9, 18) },
                new Contact { Id = 7, Name = "Сергей Морозов", JobTitle = "CTO", MobilePhone = "+79789012345", BirthDate = new DateTime(1980, 1, 25) }
                );
        }


    }
}
