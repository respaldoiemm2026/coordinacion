-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "roles" (
    "id_rol" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "materia" (
    "id_materia" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "intensidad_horaria" INTEGER NOT NULL,

    CONSTRAINT "materia_pkey" PRIMARY KEY ("id_materia")
);

-- CreateTable
CREATE TABLE "Detalle_materia" (
    "id_detalle_materia" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_materia" INTEGER NOT NULL,

    CONSTRAINT "Detalle_materia_pkey" PRIMARY KEY ("id_detalle_materia")
);

-- CreateTable
CREATE TABLE "profesores" (
    "id_profesores" SERIAL NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "materia" VARCHAR(100) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "profesores_pkey" PRIMARY KEY ("id_profesores")
);

-- CreateTable
CREATE TABLE "grados" (
    "id_grado" SERIAL NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "grados_pkey" PRIMARY KEY ("id_grado")
);

-- CreateTable
CREATE TABLE "salones" (
    "id_salones" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "salones_pkey" PRIMARY KEY ("id_salones")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id_horarios" SERIAL NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "id_profesores" INTEGER NOT NULL,
    "id_grados" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "hora" TIME(0) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id_horarios")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "profesores_email_key" ON "profesores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "grados_nombre_key" ON "grados"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "salones_nombre_key" ON "salones"("nombre");

-- AddForeignKey
ALTER TABLE "Detalle_materia" ADD CONSTRAINT "Detalle_materia_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_materia" ADD CONSTRAINT "Detalle_materia_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesores" ADD CONSTRAINT "profesores_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grados" ADD CONSTRAINT "grados_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_profesores_fkey" FOREIGN KEY ("id_profesores") REFERENCES "profesores"("id_profesores") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_grados_fkey" FOREIGN KEY ("id_grados") REFERENCES "grados"("id_grado") ON DELETE RESTRICT ON UPDATE CASCADE;
