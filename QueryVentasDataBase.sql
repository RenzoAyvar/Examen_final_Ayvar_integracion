CREATE DATABASE SistemaVentas;
GO

USE SistemaVentas;
GO

-- Tabla Categoría
CREATE TABLE Categoria (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL
);

-- Tabla Producto
CREATE TABLE Producto (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    CategoriaId INT NOT NULL,
    FOREIGN KEY (CategoriaId) REFERENCES Categoria(Id)
);

-- Tabla Cliente
CREATE TABLE Cliente (
    Id INT PRIMARY KEY IDENTITY,
    Nombres NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100),
    Correo NVARCHAR(100)
);

-- Tabla Venta
CREATE TABLE Venta (
    Id INT PRIMARY KEY IDENTITY,
    ClienteId INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ClienteId) REFERENCES Cliente(Id)
);

-- Tabla DetalleVenta
CREATE TABLE DetalleVenta (
    Id INT PRIMARY KEY IDENTITY,
    VentaId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    Subtotal AS (Cantidad * PrecioUnitario) PERSISTED,
    FOREIGN KEY (VentaId) REFERENCES Venta(Id),
    FOREIGN KEY (ProductoId) REFERENCES Producto(Id)
);

INSERT INTO Categoria (Nombre) VALUES ('Electrónica');
INSERT INTO Categoria (Nombre) VALUES ('Ropa');
INSERT INTO Categoria (Nombre) VALUES ('Alimentos');

SELECT * FROM Categoria

INSERT INTO Producto (Nombre, Precio, Stock, CategoriaId)
VALUES ('Laptop Lenovo', 2500.00, 10, 1);

INSERT INTO Producto (Nombre, Precio, Stock, CategoriaId)
VALUES ('Polo Manga Larga', 50.00, 30, 2);

INSERT INTO Producto (Nombre, Precio, Stock, CategoriaId)
VALUES ('Arroz 1kg', 3.50, 100, 3);

SELECT * FROM Producto

INSERT INTO Cliente (Nombres, Apellidos, Correo)
VALUES ('Juan', 'Pérez', 'juanperez@example.com');

INSERT INTO Cliente (Nombres, Apellidos, Correo)
VALUES ('Ana', 'Ramírez', 'ana.ramirez@example.com');

SELECT * FROM Cliente

INSERT INTO Venta (ClienteId, Fecha, Total)
VALUES (1, GETDATE(), 100.00);

INSERT INTO Venta (ClienteId, Fecha, Total)
VALUES (2, GETDATE(), 175.00);

SELECT * FROM Venta

-- Detalles para la venta de Juan (VentaId = 1)
INSERT INTO DetalleVenta (VentaId, ProductoId, Cantidad, PrecioUnitario)
VALUES (1, 1, 1, 100.00);  -- Laptop Lenovo

-- Detalles para la venta de Ana (VentaId = 2)
INSERT INTO DetalleVenta (VentaId, ProductoId, Cantidad, PrecioUnitario)
VALUES (2, 2, 2, 50.00);  -- 2 polos
INSERT INTO DetalleVenta (VentaId, ProductoId, Cantidad, PrecioUnitario)
VALUES (2, 3, 5, 5.00);   -- 5kg de arroz

SELECT * FROM DetalleVenta