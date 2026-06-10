using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_Jobs_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemoteStatus",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalaryMax",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalaryMin",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Jobs",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Jobs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salary",
                table: "Jobs",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "Jobs",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "RemoteStatus",
                table: "Jobs",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "SalaryMax",
                table: "Jobs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SalaryMin",
                table: "Jobs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);
        }
    }
}
