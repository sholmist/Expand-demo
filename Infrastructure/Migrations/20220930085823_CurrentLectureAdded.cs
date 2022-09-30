using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class CurrentLectureAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02a43c7c-cfd1-44a6-97f8-36c9b440906b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41bd0937-a5be-4c4e-bb0f-c86aa1402d4f");

            migrationBuilder.AddColumn<int>(
                name: "CurrentLecture",
                table: "UserCourses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "79878f6b-8757-46a5-8712-09cfc11dc9e4", "c24027c3-31ca-4ce0-9fe0-d5f1b3a9961d", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "300fe8b8-7546-43b8-9b56-9d9b9e75c5f0", "bd2e96b2-b809-40ed-a049-f51f9f7e7815", "Instructor", "INSTRUCTOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "300fe8b8-7546-43b8-9b56-9d9b9e75c5f0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79878f6b-8757-46a5-8712-09cfc11dc9e4");

            migrationBuilder.DropColumn(
                name: "CurrentLecture",
                table: "UserCourses");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "02a43c7c-cfd1-44a6-97f8-36c9b440906b", "b0792bed-9320-4e8f-acc9-0b0a02c82951", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "41bd0937-a5be-4c4e-bb0f-c86aa1402d4f", "8a40a813-0bbd-4cae-9f8d-e3905c9d7f00", "Instructor", "INSTRUCTOR" });
        }
    }
}
