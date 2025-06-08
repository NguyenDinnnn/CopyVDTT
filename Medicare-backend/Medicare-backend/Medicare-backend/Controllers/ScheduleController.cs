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
    public class ScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Doctor,Coordinator,Patient")]
        public async Task<ActionResult<IEnumerable<WorkSchedule>>> GetSchedules()
        {
            return await _context.WorkSchedules
                .Include(s => s.Doctor)
                .Include(s => s.Service)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Doctor,Coordinator,Patient")]
        public async Task<ActionResult<WorkSchedule>> GetSchedule(int id)
        {
            var schedule = await _context.WorkSchedules
                .Include(s => s.Doctor)
                .Include(s => s.Service)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (schedule == null)
                return NotFound();
            return schedule;
        }

        [HttpPost]
        [Authorize(Roles = "Coordinator")]
        public async Task<ActionResult<WorkSchedule>> CreateSchedule(WorkSchedule schedule)
        {
            _context.WorkSchedules.Add(schedule);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSchedule), new { id = schedule.Id }, schedule);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> UpdateSchedule(int id, WorkSchedule schedule)
        {
            if (id != schedule.Id)
                return BadRequest();

            _context.Entry(schedule).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.WorkSchedules.Any(s => s.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            var schedule = await _context.WorkSchedules.FindAsync(id);
            if (schedule == null)
                return NotFound();

            _context.WorkSchedules.Remove(schedule);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}