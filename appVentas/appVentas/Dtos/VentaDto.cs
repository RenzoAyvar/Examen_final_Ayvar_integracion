namespace appVentas.Dtos
{
    public class VentaDto
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }
        public string ClienteNombre { get; set; }
        public List<DetalleVentaDto> Detalles { get; set; }
    }
}
