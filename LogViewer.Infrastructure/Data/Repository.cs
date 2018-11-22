using LogViewer.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LogViewer.Infrastructure.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly LoggingDbContext context;
        protected readonly DbSet<T> dbSet;

        public Repository(LoggingDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            dbSet = context.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            dbSet.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            dbSet.Remove(entity);
            await context.SaveChangesAsync();
        }

        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate) => dbSet.FirstOrDefaultAsync(predicate);

        public Task<T> GetByIdAsync(long id) => dbSet.FindAsync(id);

        public async Task<IReadOnlyList<T>> GetWhereAsync(Expression<Func<T, bool>> predicate) => await dbSet.Where(predicate).ToListAsync().ConfigureAwait(false);

        public async Task<IReadOnlyList<T>> ListAllAsync() => await dbSet.ToListAsync().ConfigureAwait(false);

        public async Task UpdateAsync(T entity)
        {
            dbSet.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
