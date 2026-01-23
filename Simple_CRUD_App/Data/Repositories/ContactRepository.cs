using Microsoft.EntityFrameworkCore;
using Simple_CRUD_App.Data.Contexts;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;

namespace Simple_CRUD_App.Data.Repositories
{
    public class ContactRepository : IRepository<Contact>
    {
        private readonly LocalDbContext _db;
        public ContactRepository(LocalDbContext db) {
            _db = db;
        }
        public  Task<Contact> CreateAsync(Contact entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Contact>> GetAllAsync()
        {
            return _db.Contacts.ToListAsync();
        }

        public Task<Contact?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Contact entity)
        {
            throw new NotImplementedException();
        }
    }
}
