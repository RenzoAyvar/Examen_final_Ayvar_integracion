using appVentas.Data;
using appVentas.Dtos;
using appVentas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace appVentas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetalleVentaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DetalleVentaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/venta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VentaDto>>> GetVentas()
        {
            var ventas = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .ToListAsync();

            var ventasDto = ventas.Select(v => new VentaDto
            {
                Id = v.Id,
                Fecha = v.Fecha,
                Total = v.Total,
                ClienteNombre = v.Cliente.Nombres,
                Detalles = v.Detalles.Select(d => new DetalleVentaDto
                {
                    ProductoId = d.ProductoId,
                    ProductoNombre = d.Producto.Nombre,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario,
                    Subtotal = d.Subtotal
                }).ToList()
            }).ToList();

            return Ok(ventasDto);
        }


        // GET: api/venta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
                return NotFound();

            return venta;
        }

        // POST: api/venta
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(Venta venta)
        {
            // Asegúrate que el cliente existe
            var cliente = await _context.Clientes.FindAsync(venta.ClienteId);
            if (cliente == null)
                return BadRequest("Cliente no válido");

            // Validar productos
            foreach (var detalle in venta.Detalles)
            {
                var producto = await _context.Productos.FindAsync(detalle.ProductoId);
                if (producto == null)
                    return BadRequest($"Producto con ID {detalle.ProductoId} no existe");

                // Puedes calcular el subtotal aquí si deseas
                detalle.PrecioUnitario = producto.Precio;
                detalle.Subtotal = producto.Precio * detalle.Cantidad;
            }

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
