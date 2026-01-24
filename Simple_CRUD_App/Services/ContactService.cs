using Simple_CRUD_App.Data.Repositories;
using Simple_CRUD_App.DTOs;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;

namespace Simple_CRUD_App.Services
{
    public class ContactService
    {
        private readonly IRepository<Contact> _repository;

        public ContactService(IRepository<Contact> repository)
        {
            _repository = repository;
        }

        internal async Task<Contact?> CreateContactAsync(Contact contact)
        {
            return await _repository.CreateAsync(contact);
        }

        internal Task<bool> DeleteByIdAsync(int id)
        {
            return _repository.DeleteAsync(id);
        }

        internal async Task<ContactListDto> GetAllContactsAsync()
        {
            var allContacts = await _repository.GetAllAsync();
            return new ContactListDto { Contacts = allContacts };
            //throw new NotImplementedException();
        }

        internal async Task<Contact?> GetContactByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        internal async Task<bool> UpdateAsync(int id, Contact contact)
        {
           return await _repository.UpdateAsync(id, contact);
        }
    }
}
