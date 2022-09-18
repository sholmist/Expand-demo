using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Entity;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILogger logger)
        {
            try
            {
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
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }
        }
    }
}