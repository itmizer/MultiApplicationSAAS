/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,name]` on the table `typePayment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `typePayment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_typePayment_fkey`;

-- DropIndex
DROP INDEX `typePayment_name_key` ON `typePayment`;

-- AlterTable
ALTER TABLE `typePayment` MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `typePayment_tenant_id_name_key` ON `typePayment`(`tenant_id`, `name`);
