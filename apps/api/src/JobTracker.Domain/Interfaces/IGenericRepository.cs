using System.Linq.Expressions;

namespace JobTracker.Domain.Interfaces;

/// <summary>
/// Defines the core repository operations for any entity type.
/// </summary>
/// <typeparam name="T">The type of the entity.</typeparam>
public interface IGenericRepository<T> where T : class
{
    /// <summary>
    /// Gets an entity by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the entity.</param>
    /// <returns>The entity if found; otherwise, null.</returns>
    Task<T?> GetByIdAsync(Guid id);

    /// <summary>
    /// Gets the first entity that matches the specified predicate.
    /// </summary>
    /// <param name="predicate">A function to test each element for a condition.</param>
    /// <param name="isTracking">If set to true, the entity will be tracked by the context.</param>
    /// <returns>The first entity matching the condition; otherwise, null.</returns>
    Task<T?> GetFirstOrDefaultAsync(Expression<Func<T, bool>> predicate, bool isTracking = false);

    /// <summary>
    /// Gets all entities of type T.
    /// </summary>
    /// <param name="isTracking">If set to true, entities will be tracked by the context.</param>
    /// <returns>A collection of all entities.</returns>
    Task<IEnumerable<T>> GetAllAsync(bool isTracking = false);

    /// <summary>
    /// Gets all entities of type T that match the specified predicate.
    /// </summary>
    /// <param name="predicate">A function to test each element for a condition.</param>
    /// <param name="isTracking">If set to true, entities will be tracked by the context.</param>
    /// <returns>A collection of all entities matching the condition.</returns>
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate, bool isTracking = false);
    
    /// <summary>
    /// Returns an IQueryable for the entity to allow further LINQ operations like Include or OrderBy.
    /// </summary>
    /// <returns>An IQueryable of type T.</returns>
    IQueryable<T> GetQueryable();

    /// <summary>
    /// Adds a new entity to the repository.
    /// </summary>
    /// <param name="entity">The entity to add.</param>
    Task AddAsync(T entity);

    /// <summary>
    /// Adds a collection of entities to the repository.
    /// </summary>
    /// <param name="entities">The collection of entities to add.</param>
    Task AddRangeAsync(IEnumerable<T> entities);

    /// <summary>
    /// Marks an existing entity as modified.
    /// </summary>
    /// <param name="entity">The entity to update.</param>
    void Update(T entity);

    /// <summary>
    /// Marks a collection of entities as modified.
    /// </summary>
    /// <param name="entities">The collection of entities to update.</param>
    void UpdateRange(IEnumerable<T> entities);

    /// <summary>
    /// Marks an entity to be removed from the repository.
    /// </summary>
    /// <param name="entity">The entity to remove.</param>
    void Remove(T entity);

    /// <summary>
    /// Marks a collection of entities to be removed from the repository.
    /// </summary>
    /// <param name="entities">The collection of entities to remove.</param>
    void RemoveRange(IEnumerable<T> entities);

    /// <summary>
    /// Checks if any entity matches the specified condition.
    /// </summary>
    /// <param name="predicate">A function to test each element for a condition.</param>
    /// <returns>True if any entity matches the condition; otherwise, false.</returns>
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);

    /// <summary>
    /// Counts the number of entities that match the specified condition.
    /// </summary>
    /// <param name="predicate">Optional condition to filter the count.</param>
    /// <returns>The number of entities matching the condition.</returns>
    Task<int> CountAsync(Expression<Func<T, bool>> predicate = null!);
}
