using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjArchiGenerator.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProjectArchitectureModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArchitectureLevel",
                table: "ProjectArchitecture",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Prompt",
                table: "ProjectArchitecture",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArchitectureLevel",
                table: "ProjectArchitecture");

            migrationBuilder.DropColumn(
                name: "Prompt",
                table: "ProjectArchitecture");
        }
    }
}
