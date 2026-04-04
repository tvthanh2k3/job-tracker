using System.Collections;
using JobTracker.Domain.Interfaces;
using JobTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace JobTracker.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly JobTrackerDbContext _context;
    private Hashtable? _repositories;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(JobTrackerDbContext context)
    {
        _context = context;
    }

    public IGenericRepository<T> Repository<T>() where T : class
    {
        if (_repositories == null) _repositories = new Hashtable();

        var type = typeof(T).Name;

        if (!_repositories.ContainsKey(type))
        {
            var repositoryType = typeof(GenericRepository<>);
            var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);

            _repositories.Add(type, repositoryInstance);
        }

        return (IGenericRepository<T>)_repositories[type]!;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        try
        {
            await _context.SaveChangesAsync();
            if (_transaction != null) await _transaction.CommitAsync();
        }
        catch
        {
            await RollbackAsync();
            throw;
        }
        finally
        {
            if (_transaction != null)
            {
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }
    }

    public async Task RollbackAsync()
    {
        if (_transaction != null)
        {
            await _transaction.RollbackAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public void Dispose()
    {
        _context.Dispose();
        _transaction?.Dispose();
        GC.SuppressFinalize(this);
    }
}
