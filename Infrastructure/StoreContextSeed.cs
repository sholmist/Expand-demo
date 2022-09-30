using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILogger logger, UserManager<User> userManager)
        {
            try
            {
                if (!userManager.Users.Any())
                {
                    var student = new User
                    {
                        UserName = "student",
                        Email = "student@test.com"
                    };
                    await userManager.CreateAsync(student, "Password@123");
                    await userManager.AddToRoleAsync(student, "Student");

                    var instructor = new User
                    {
                        UserName = "instructor",
                        Email = "instructor@test.com"
                    };
                    await userManager.CreateAsync(instructor, "Password@123");
                    await userManager.AddToRolesAsync(instructor, new String[] { "Instructor", "Student" });
                }
                if (!context.Categories.Any())
                {
                    var categoryData = File.ReadAllText("../Infrastructure/SeedData/categories.json");
                    var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

                    foreach (var item in categories)
                    {
                        context.Categories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Courses.Any())
                {
                    var courseData = File.ReadAllText("../Infrastructure/SeedData/courses.json");
                    var courses = JsonSerializer.Deserialize<List<Course>>(courseData);

                    foreach (var item in courses)
                    {
                        context.Courses.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Learnings.Any())
                {
                    var learningData = File.ReadAllText("../Infrastructure/SeedData/learnings.json");
                    var learnings = JsonSerializer.Deserialize<List<Learning>>(learningData);

                    foreach (var item in learnings)
                    {
                        context.Learnings.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Requirements.Any())
                {
                    var requirementData = File.ReadAllText("../Infrastructure/SeedData/requirements.json");
                    var requirements = JsonSerializer.Deserialize<List<Requirement>>(requirementData);

                    foreach (var item in requirements)
                    {
                        context.Requirements.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                if (!context.Sections.Any())
                {
                    var sectionsData = File.ReadAllText("../Infrastructure/SeedData/sections.json");
                    var sections = JsonSerializer.Deserialize<List<Section>>(sectionsData);

                    foreach (var item in sections)
                    {
                        var course = await context.Courses.FindAsync(item.CourseId);

                        var section = new Section
                        {
                            Id = item.Id,
                            Name = item.Name,
                            Course = course
                        };

                        context.Sections.Add(item);

                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Lectures.Any())
                {
                    var lecturesData = File.ReadAllText("../Infrastructure/SeedData/lectures.json");
                    var lectures = JsonSerializer.Deserialize<List<Lecture>>(lecturesData);

                    foreach (var item in lectures)
                    {
                        var section = await context.Sections.FindAsync(item.SectionId);

                        var lecture = new Lecture
                        {
                            Id = item.Id,
                            Title = item.Title,
                            Url = item.Url,
                            Section = section
                        };

                        context.Lectures.Add(item);

                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }
        }
    }
}