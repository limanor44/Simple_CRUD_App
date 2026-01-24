using Microsoft.EntityFrameworkCore;
using Simple_CRUD_App.Data.Contexts;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;

namespace Simple_CRUD_App.Data.Repositories
{
    public class ContactRepository : IRepository<Contact>
    {
        private readonly LocalDbContext _db;
        public ContactRepository(LocalDbContext db)
        {
            _db = db;
        }
        public async Task<Contact?> CreateAsync(Contact entity)
        {
            if (await _db.Database.CanConnectAsync())
            {
                await _db.Contacts.AddAsync(entity);
                await _db.SaveChangesAsync();
                return entity;
            }
            return null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if(await _db.Database.CanConnectAsync() && 
                await _db.Contacts.FindAsync(id) is Contact contact)
            {
                _db.Contacts.Remove(contact);
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public Task<List<Contact>> GetAllAsync()
        {
            return _db.Contacts.ToListAsync();
        }

        public Task<Contact?> GetByIdAsync(int id)
        {
            return _db.Contacts.FindAsync(id).AsTask();
        }

        public async Task<bool> UpdateAsync(int id, Contact entity)
        {
            if(await _db.Database.CanConnectAsync() &&
                await _db.Contacts.FindAsync(id) is Contact dbContact)
            {
                entity.Id = id;
                _db.Entry(dbContact).CurrentValues.SetValues(entity);
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
            
        }
    }
}
