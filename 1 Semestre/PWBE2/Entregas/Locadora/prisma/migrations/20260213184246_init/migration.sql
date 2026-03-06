CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cnh` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `Clientes_email_key` (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Carros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(7) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` VARCHAR(4) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `Carros_placa_key` (`placa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Carros`
ADD CONSTRAINT `Carros_clienteId_fkey`
FOREIGN KEY (`clienteId`)
REFERENCES `Clientes`(`id`)
ON DELETE RESTRICT
ON UPDATE CASCADE;