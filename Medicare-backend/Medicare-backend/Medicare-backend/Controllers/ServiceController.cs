using Medicare_backend.Data;
using Medicare_backend.Models;
using Medicare_backend.Data;
using Medicare_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Doctor,Coordinator,Patient")]
        public async Task<ActionResult<IEnumerable<MedicalService>>> GetServices()
        {
            return await _context.MedicalServices
                .Include(s => s.Doctor)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Doctor,Coordinator,Patient")]
        public async Task<ActionResult<MedicalService>> GetService(int id)
        {
            var service = await _context.MedicalServices
                .Include(s => s.Doctor)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (service == null)
                return NotFound();
            return service;
        }

        [HttpPost]
        [Authorize(Roles = "Coordinator")]
        public async Task<ActionResult<MedicalService>> CreateService(MedicalService service)
        {
            _context.MedicalServices.Add(service);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> UpdateService(int id, MedicalService service)
        {
            if (id != service.Id)
                return BadRequest();

            _context.Entry(service).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.MedicalServices.Any(s => s.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.MedicalServices.FindAsync(id);
            if (service == null)
                return NotFound();

            _context.MedicalServices.Remove(service);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}