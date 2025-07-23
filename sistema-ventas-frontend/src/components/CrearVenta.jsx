import { useEffect, useState } from 'react'
import axios from 'axios'

function CrearVenta() {
  const [clientes, setClientes] = useState([])
  const [productos, setProductos] = useState([])
  const [clienteId, setClienteId] = useState('')
  const [productoId, setProductoId] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [detalles, setDetalles] = useState([])

  useEffect(() => {
    axios.get('https://localhost:7130/api/Cliente')
      .then(res => setClientes(res.data))
      .catch(err => console.error('Error cargando clientes', err))

    axios.get('https://localhost:7130/api/Producto')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error cargando productos', err))
  }, [])

  const agregarDetalle = () => {
    const producto = productos.find(p => p.id === parseInt(productoId))
    if (!producto || cantidad <= 0) return

    const nuevoDetalle = {
      productoId: producto.id,
      nombre: producto.nombre,
      cantidad,
      precio: producto.precio
    }

    setDetalles([...detalles, nuevoDetalle])
    setProductoId('')
    setCantidad(1)
  }

  const guardarVenta = () => {
    const venta = {
      clienteId: parseInt(clienteId),
      fecha: new Date().toISOString(),
      detalles: detalles.map(d => ({
        productoId: d.productoId,
        cantidad: d.cantidad,
        precio: d.precio
      }))
    }

    axios.post('https://localhost:7130/api/Venta', venta)
      .then(res => {
        alert('Venta registrada con éxito')
        setClienteId('')
        setDetalles([])
      })
      .catch(err => {
        console.error('Error guardando venta', err)
        alert('Error al registrar la venta')
      })
  }

  return (
    <div>
      <h2>Registrar Venta</h2>

      <div>
        <label>Cliente:</label>
        <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
          <option value="">Seleccione</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto:</label>
        <select value={productoId} onChange={e => setProductoId(e.target.value)}>
          <option value="">Seleccione</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - S/{p.precio}</option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={e => setCantidad(parseInt(e.target.value))}
        />

        <button onClick={agregarDetalle}>Agregar</button>
      </div>

      <h3>Detalles de la Venta</h3>
      <ul>
        {detalles.map((d, index) => (
          <li key={index}>
            {d.nombre} - Cantidad: {d.cantidad} - Precio unitario: S/{d.precio}
          </li>
        ))}
      </ul>

      <button onClick={guardarVenta} disabled={!clienteId || detalles.length === 0}>
        Guardar Venta
      </button>
    </div>
  )
}

export default CrearVenta
