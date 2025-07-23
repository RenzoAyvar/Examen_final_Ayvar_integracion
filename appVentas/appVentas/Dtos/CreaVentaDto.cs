using appVentas.Dtos;

public class CreaVentaDto
{
    public DateTime Fecha { get; set; }
    public int ClienteId { get; set; }
    public List<DetalleVentaCrearDto> Detalles { get; set; }
}
