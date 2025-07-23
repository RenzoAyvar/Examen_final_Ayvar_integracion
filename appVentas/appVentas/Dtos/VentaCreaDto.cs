namespace appVentas.Dtos
{
    public class VentaCreaDto
    {
            public DateTime Fecha { get; set; }
            public int ClienteId { get; set; }
            public List<DetalleVentaCreaDto> Detalles { get; set; }
    }
}
