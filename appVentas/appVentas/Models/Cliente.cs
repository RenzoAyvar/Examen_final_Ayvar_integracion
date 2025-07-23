namespace appVentas.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }

        public ICollection<Venta> Ventas { get; set; }
    }

}
