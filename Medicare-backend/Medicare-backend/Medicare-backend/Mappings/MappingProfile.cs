using AutoMapper;
using Medicare_backend.DTOs;
using Medicare_backend.Models;

namespace Medicare_backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Specialty, SpecialtyDto>().ReverseMap();
            CreateMap<Clinic, ClinicDto>().ReverseMap();
            CreateMap<Doctor, DoctorDto>().ReverseMap();
            CreateMap<Service, ServiceDto>().ReverseMap();
        }
    }
}