-- CreateTable
CREATE TABLE "Huesped" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "numeroDocumento" INTEGER NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),

    CONSTRAINT "Huesped_pkey" PRIMARY KEY ("id")
);
