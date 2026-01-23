namespace Simple_CRUD_App.Interfaces
{
    public interface IRepository<T>
    {
        public Task<List<T>> GetAllAsync();
        public Task<T?> GetByIdAsync(int id);
        public Task<bool> DeleteAsync(int id);
        public Task UpdateAsync(T entity);
        public Task<T> CreateAsync(T entity);
    }
}
