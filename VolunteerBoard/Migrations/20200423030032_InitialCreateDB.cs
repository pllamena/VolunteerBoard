using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VolunteerBoardAPI.Migrations
{
    public partial class InitialCreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(unicode: false, nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    JobId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostedById = table.Column<int>(nullable: false),
                    AcceptedById = table.Column<int>(nullable: true),
                    Description = table.Column<string>(unicode: false, nullable: false),
                    Zip = table.Column<string>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.JobId);
                    table.ForeignKey(
                        name: "FK_Jobs_Users_AcceptedById",
                        column: x => x.AcceptedById,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_Users_PostedById",
                        column: x => x.PostedById,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "Name" },
                values: new object[] { 1, "plamena.mineva.scholz@gmail.com", "Plamena" });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "JobId", "AcceptedById", "CreatedOn", "Description", "PostedById", "Zip" },
                values: new object[] { 1, null, new DateTime(2020, 4, 22, 23, 0, 31, 843, DateTimeKind.Local).AddTicks(4158), "Test 1", 1, "16511" });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "JobId", "AcceptedById", "CreatedOn", "Description", "PostedById", "Zip" },
                values: new object[] { 2, null, new DateTime(2020, 4, 22, 23, 0, 31, 849, DateTimeKind.Local).AddTicks(991), "Test 2", 1, "16428" });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "JobId", "AcceptedById", "CreatedOn", "Description", "PostedById", "Zip" },
                values: new object[] { 3, null, new DateTime(2020, 4, 22, 23, 0, 31, 849, DateTimeKind.Local).AddTicks(1114), "Test 3", 1, "45365" });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_AcceptedById",
                table: "Jobs",
                column: "AcceptedById");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_PostedById",
                table: "Jobs",
                column: "PostedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
