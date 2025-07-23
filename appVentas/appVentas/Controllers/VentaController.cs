using appVentas.Data;
using appVentas.Dtos;
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
                    v.ClienteId,
                    ClienteNombre = v.Cliente.Nombres
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
        public async Task<IActionResult> CrearVenta([FromBody] VentaCreaDto ventaDto)
        {
            try
            {
                var cliente = await _context.Clientes.FindAsync(ventaDto.ClienteId);
                if (cliente == null)
                    return BadRequest("Cliente no válido");

                var venta = new Venta
                {
                    Fecha = ventaDto.Fecha,
                    ClienteId = ventaDto.ClienteId,
                    Detalles = new List<DetalleVenta>()
                };

                foreach (var detalleDto in ventaDto.Detalles)
                {
                    var producto = await _context.Productos.FindAsync(detalleDto.ProductoId);
                    if (producto == null)
                        return BadRequest($"Producto con ID {detalleDto.ProductoId} no existe");

                    var detalle = new DetalleVenta
                    {
                        ProductoId = detalleDto.ProductoId,
                        Cantidad = detalleDto.Cantidad,
                        PrecioUnitario = producto.Precio,
                        Subtotal = detalleDto.Cantidad * producto.Precio
                    };

                    venta.Detalles.Add(detalle);
                }

                venta.Total = venta.Detalles.Sum(d => d.Subtotal);

                _context.Ventas.Add(venta);
                await _context.SaveChangesAsync();

                return Ok(new { mensaje = "Venta registrada exitosamente", venta.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al registrar la venta: {ex.Message}");
            }
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
            var venta = await _context.Ventas
                .Include(v => v.Detalles)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
                return NotFound();

            _context.DetallesVenta.RemoveRange(venta.Detalles);
            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
