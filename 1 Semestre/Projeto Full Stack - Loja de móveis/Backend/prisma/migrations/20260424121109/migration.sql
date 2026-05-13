/*
  Warnings:

  - You are about to drop the `imagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publicacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `imagem` DROP FOREIGN KEY `Imagem_publicacoesId_fkey`;

-- DropTable
DROP TABLE `imagem`;

-- DropTable
DROP TABLE `publicacao`;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
