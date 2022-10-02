using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class PublishedPropertyNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34175b54-9513-41cc-b34d-865048f8e04c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "66d94799-8c49-4311-9b68-77c70d174c2f");

            migrationBuilder.RenameColumn(
                name: "IsPublished",
                table: "Courses",
                newName: "Published");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ce15118b-41d3-45ef-972c-a120bce7b03e", "f341bcc9-5f07-41a4-accc-3ebdc2bb9cc3", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1072c9fe-3480-46d9-bc60-84c8aae16035", "720b1470-997e-403d-be77-882f513079cd", "Instructor", "INSTRUCTOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1072c9fe-3480-46d9-bc60-84c8aae16035");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce15118b-41d3-45ef-972c-a120bce7b03e");

            migrationBuilder.RenameColumn(
                name: "Published",
                table: "Courses",
                newName: "IsPublished");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "34175b54-9513-41cc-b34d-865048f8e04c", "c68bb62f-0550-48f4-a40e-c6fd02d56f9e", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "66d94799-8c49-4311-9b68-77c70d174c2f", "5dce7753-31b0-4172-9c2c-c04371bd0e82", "Instructor", "INSTRUCTOR" });
        }
    }
}
