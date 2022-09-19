using System;
using System.Linq.Expressions;

namespace Entity.Specifications
{
    public class CoursesWithCategoriesSpecification : BaseSpecification<Course>
    {
        public CoursesWithCategoriesSpecification(string sort)
        {
            IncludeMethod(x => x.Category);

            if(!string.IsNullOrEmpty(sort))
            {
                switch (sort)
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