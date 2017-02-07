
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 02/05/2017 19:10:26
-- Generated from EDMX file: C:\Kiosk\Kiosk.Backend\Kiosk.Backend\Models\Kiosko.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [kiosk];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_ProveedorArticulo_Proveedor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProveedorArticulo] DROP CONSTRAINT [FK_ProveedorArticulo_Proveedor];
GO
IF OBJECT_ID(N'[dbo].[FK_ProveedorArticulo_Articulo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProveedorArticulo] DROP CONSTRAINT [FK_ProveedorArticulo_Articulo];
GO
IF OBJECT_ID(N'[dbo].[FK_LineItemArticulo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[VentaArticulos] DROP CONSTRAINT [FK_LineItemArticulo];
GO
IF OBJECT_ID(N'[dbo].[FK_VentaLineItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[VentaArticulos] DROP CONSTRAINT [FK_VentaLineItem];
GO
IF OBJECT_ID(N'[dbo].[FK_FacturaProveedor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Facturas] DROP CONSTRAINT [FK_FacturaProveedor];
GO
IF OBJECT_ID(N'[dbo].[FK_FacturaLineItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[VentaArticulos] DROP CONSTRAINT [FK_FacturaLineItem];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Articulos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Articulos];
GO
IF OBJECT_ID(N'[dbo].[Proveedores]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Proveedores];
GO
IF OBJECT_ID(N'[dbo].[Ventas]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Ventas];
GO
IF OBJECT_ID(N'[dbo].[VentaArticulos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[VentaArticulos];
GO
IF OBJECT_ID(N'[dbo].[Facturas]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Facturas];
GO
IF OBJECT_ID(N'[dbo].[ProveedorArticulo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProveedorArticulo];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Articulos'
CREATE TABLE [dbo].[Articulos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(max)  NOT NULL,
    [Dimensiones] nvarchar(max)  NOT NULL,
    [Tags] nvarchar(max)  NOT NULL,
    [PrecioUnitario] decimal(18,0)  NOT NULL,
    [PrecioVenta] decimal(18,0)  NOT NULL,
    [Imagen] nvarchar(max)  NOT NULL,
    [Stock] int  NOT NULL,
    [Barcode] nvarchar(max)  NOT NULL,
    [Marca] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Proveedores'
CREATE TABLE [dbo].[Proveedores] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(max)  NOT NULL,
    [RUT] nvarchar(max)  NOT NULL,
    [RazonSocial] nvarchar(max)  NOT NULL,
    [Imagen] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Ventas'
CREATE TABLE [dbo].[Ventas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] datetime  NOT NULL
);
GO

-- Creating table 'VentaArticulos'
CREATE TABLE [dbo].[VentaArticulos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Cantidad] nvarchar(max)  NOT NULL,
    [PrecioUnitario] nvarchar(max)  NOT NULL,
    [VentaId] int  NOT NULL,
    [FacturaId] int  NOT NULL,
    [Articulo_Id] int  NOT NULL
);
GO

-- Creating table 'Facturas'
CREATE TABLE [dbo].[Facturas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] datetime  NOT NULL,
    [Proveedor_Id] int  NOT NULL
);
GO

-- Creating table 'ProveedorArticulo'
CREATE TABLE [dbo].[ProveedorArticulo] (
    [Proveedores_Id] int  NOT NULL,
    [Articulos_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Articulos'
ALTER TABLE [dbo].[Articulos]
ADD CONSTRAINT [PK_Articulos]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Proveedores'
ALTER TABLE [dbo].[Proveedores]
ADD CONSTRAINT [PK_Proveedores]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Ventas'
ALTER TABLE [dbo].[Ventas]
ADD CONSTRAINT [PK_Ventas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'VentaArticulos'
ALTER TABLE [dbo].[VentaArticulos]
ADD CONSTRAINT [PK_VentaArticulos]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Facturas'
ALTER TABLE [dbo].[Facturas]
ADD CONSTRAINT [PK_Facturas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Proveedores_Id], [Articulos_Id] in table 'ProveedorArticulo'
ALTER TABLE [dbo].[ProveedorArticulo]
ADD CONSTRAINT [PK_ProveedorArticulo]
    PRIMARY KEY CLUSTERED ([Proveedores_Id], [Articulos_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Proveedores_Id] in table 'ProveedorArticulo'
ALTER TABLE [dbo].[ProveedorArticulo]
ADD CONSTRAINT [FK_ProveedorArticulo_Proveedor]
    FOREIGN KEY ([Proveedores_Id])
    REFERENCES [dbo].[Proveedores]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Articulos_Id] in table 'ProveedorArticulo'
ALTER TABLE [dbo].[ProveedorArticulo]
ADD CONSTRAINT [FK_ProveedorArticulo_Articulo]
    FOREIGN KEY ([Articulos_Id])
    REFERENCES [dbo].[Articulos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProveedorArticulo_Articulo'
CREATE INDEX [IX_FK_ProveedorArticulo_Articulo]
ON [dbo].[ProveedorArticulo]
    ([Articulos_Id]);
GO

-- Creating foreign key on [Articulo_Id] in table 'VentaArticulos'
ALTER TABLE [dbo].[VentaArticulos]
ADD CONSTRAINT [FK_LineItemArticulo]
    FOREIGN KEY ([Articulo_Id])
    REFERENCES [dbo].[Articulos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_LineItemArticulo'
CREATE INDEX [IX_FK_LineItemArticulo]
ON [dbo].[VentaArticulos]
    ([Articulo_Id]);
GO

-- Creating foreign key on [VentaId] in table 'VentaArticulos'
ALTER TABLE [dbo].[VentaArticulos]
ADD CONSTRAINT [FK_VentaLineItem]
    FOREIGN KEY ([VentaId])
    REFERENCES [dbo].[Ventas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_VentaLineItem'
CREATE INDEX [IX_FK_VentaLineItem]
ON [dbo].[VentaArticulos]
    ([VentaId]);
GO

-- Creating foreign key on [Proveedor_Id] in table 'Facturas'
ALTER TABLE [dbo].[Facturas]
ADD CONSTRAINT [FK_FacturaProveedor]
    FOREIGN KEY ([Proveedor_Id])
    REFERENCES [dbo].[Proveedores]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FacturaProveedor'
CREATE INDEX [IX_FK_FacturaProveedor]
ON [dbo].[Facturas]
    ([Proveedor_Id]);
GO

-- Creating foreign key on [FacturaId] in table 'VentaArticulos'
ALTER TABLE [dbo].[VentaArticulos]
ADD CONSTRAINT [FK_FacturaLineItem]
    FOREIGN KEY ([FacturaId])
    REFERENCES [dbo].[Facturas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FacturaLineItem'
CREATE INDEX [IX_FK_FacturaLineItem]
ON [dbo].[VentaArticulos]
    ([FacturaId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------