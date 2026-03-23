-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Junior', 'Presidencial', 'Junior_decorada', 'Presidencial_decorada');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Bebidas', 'Comidas', 'Sexual');

-- AlterTable
ALTER TABLE "Huesped" ADD COLUMN     "acompananteId" TEXT,
ADD COLUMN     "habitacionResponsableId" TEXT,
ADD COLUMN     "ingreso" TIMESTAMP(3),
ADD COLUMN     "salida" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" TEXT NOT NULL,
    "numeroHabitacion" INTEGER NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "precio" INTEGER NOT NULL,
    "ocupado" BOOLEAN NOT NULL,
    "jacuzzi" BOOLEAN NOT NULL,
    "aireAcondicionado" BOOLEAN NOT NULL,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombreProducto" TEXT NOT NULL,
    "descripcionProducto" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "precio" INTEGER NOT NULL,
    "existencia" INTEGER NOT NULL,
    "cantidadSolicitada" INTEGER,
    "huespedId" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Habitacion_numeroHabitacion_key" ON "Habitacion"("numeroHabitacion");

-- AddForeignKey
ALTER TABLE "Huesped" ADD CONSTRAINT "Huesped_habitacionResponsableId_fkey" FOREIGN KEY ("habitacionResponsableId") REFERENCES "Habitacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Huesped" ADD CONSTRAINT "Huesped_acompananteId_fkey" FOREIGN KEY ("acompananteId") REFERENCES "Habitacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Huesped"("id") ON DELETE SET NULL ON UPDATE CASCADE;
