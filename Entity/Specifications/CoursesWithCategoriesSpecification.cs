using System;
using System.Linq.Expressions;

namespace Entity.Specifications
{
    public class CoursesWithCategoriesSpecification : BaseSpecification<Course>
    {
        public CoursesWithCategoriesSpecification(CourseParams courseParams) : base(x => 
        (string.IsNullOrEmpty(courseParams.Search) || x.Title.ToLower().Contains(courseParams.Search)) && (!courseParams.CategoryId.HasValue || x.CategoryId == courseParams.CategoryId))
        {
            IncludeMethod(x => x.Category);
            ApplyPagination(courseParams.PageSize * (courseParams.PageIndex - 1), courseParams.PageSize);

            if(!string.IsNullOrEmpty(courseParams.Sort))
            {
                switch (courseParams.Sort)
                {
                    case "priceAscending":
                        OrderByAscendingMethod(x => x.Price);
                        break;
                    case "priceDescending":
                        OrderByDescendingMethod(x => x.Price);
                        break;
                    default:
                        OrderByAscendingMethod(x => x.Title);
                        break;
                }
            }
        }

        public CoursesWithCategoriesSpecification(Guid id) : base(x => x.Id == id)
        {
            IncludeMethod(c => c.Requirements);
            IncludeMethod(c => c.Learnings);
        }
    }
}