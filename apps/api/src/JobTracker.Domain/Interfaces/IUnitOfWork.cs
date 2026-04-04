namespace JobTracker.Domain.Interfaces;

/// <summary>
/// Provides a coordinated unit of work across multiple repositories.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    /// <summary>
    /// Gets a repository instance for the specified entity type.
    /// </summary>
    /// <typeparam name="T">The type of the entity.</typeparam>
    /// <returns>A repository of type T.</returns>
    IGenericRepository<T> Repository<T>() where T : class;

    /// <summary>
    /// Saves all changes made in this unit of work to the database.
    /// </summary>
    /// <param name="cancellationToken">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>The number of state entries written to the database.</returns>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Begins a manual transaction for complex operations.
    /// </summary>
    Task BeginTransactionAsync();

    /// <summary>
    /// Commits the active transaction to the database.
    /// </summary>
    Task CommitAsync();

    /// <summary>
    /// Rolls back the active transaction.
    /// </summary>
    Task RollbackAsync();
}
