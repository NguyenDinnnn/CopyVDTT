﻿namespace Medicare_backend.DTOs
{
    public class ServiceDto
    {
        public int ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public decimal Cost { get; set; }
        public int Duration { get; set; }
        public string? Image { get; set; }
        public int DoctorId { get; set; }
        public int SpecialtyId { get; set; }
    }
}
