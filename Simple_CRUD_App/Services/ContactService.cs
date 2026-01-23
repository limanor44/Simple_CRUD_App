using Simple_CRUD_App.Data.Repositories;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;

namespace Simple_CRUD_App.Services
{
    public class ContactService
    {
        private readonly IRepository<Contact> _repository;

        public ContactService(ContactRepository repository)
        {
            _repository = repository;
        }

        internal Task<List<Contact>> GetAllContacts()
        {
            return _repository.GetAllAsync();
            //throw new NotImplementedException();
        }
    }
}
