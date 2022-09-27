using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Entity
{
    public class User : IdentityUser
    {
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}