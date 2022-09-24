using API.DTO;
using AutoMapper;
using Entity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Course, CourseDto>()
            .ForMember(c => c.Category, opt => opt.MapFrom(src => src.Category.Name));
            CreateMap<Requirement, RequirementDto>();
            CreateMap<Learning, LearningDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Category, CategoriesDto>();
            CreateMap<Basket, BasketDto>();
            CreateMap<BasketItem, BasketItemDto>()
            .ForMember(c => c.CourseId, opt => opt.MapFrom(src => src.CourseId))
            .ForMember(c => c.Title, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(c => c.Price, opt => opt.MapFrom(src => src.Course.Price))
            .ForMember(c => c.Image, opt => opt.MapFrom(src => src.Course.Image))
            .ForMember(c => c.Instructor, opt => opt.MapFrom(src => src.Course.Instructor));
        }
    }
}