FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project files first for layer caching — restore only re-runs when .csproj changes
COPY src/JobTracker.Domain/JobTracker.Domain.csproj src/JobTracker.Domain/
COPY src/JobTracker.Application/JobTracker.Application.csproj src/JobTracker.Application/
COPY src/JobTracker.Infrastructure/JobTracker.Infrastructure.csproj src/JobTracker.Infrastructure/
COPY src/JobTracker.Api/JobTracker.Api.csproj src/JobTracker.Api/
RUN dotnet restore src/JobTracker.Api/JobTracker.Api.csproj

COPY src/ src/
RUN dotnet publish src/JobTracker.Api/JobTracker.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "JobTracker.Api.dll"]
