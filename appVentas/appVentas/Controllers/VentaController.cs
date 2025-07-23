using appVentas.Data;
using appVentas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace appVentas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/venta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetVentas()
        {
            var ventas = await _context.Ventas
                .Select(v => new
                {
                    v.Id,
                    v.Fecha,
                    v.Total,
                    v.ClienteId
                })
                .ToListAsync();

            return Ok(ventas);
        }

        // GET: api/venta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Where(v => v.Id == id)
                .Select(v => new
                {
                    v.Id,
                    v.Fecha,
                    v.Total,
                    v.ClienteId
                })
                .FirstOrDefaultAsync();

            if (venta == null)
                return NotFound();

            return Ok(venta);
        }

        // POST: api/venta
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(Venta venta)
        {
            var cliente = await _context.Clientes.FindAsync(venta.ClienteId);
            if (cliente == null)
                return BadRequest("Cliente no válido");

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta);
        }

        // PUT: api/venta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenta(int id, Venta venta)
        {
            if (id != venta.Id)
                return BadRequest();

            _context.Entry(venta).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/venta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null)
                return NotFound();

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
