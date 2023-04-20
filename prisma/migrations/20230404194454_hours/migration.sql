/*
  Warnings:

  - A unique constraint covering the columns `[idHour,tenant_id]` on the table `hours` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `PersonAppointment` DROP FOREIGN KEY `PersonAppointment_idHour_fkey`;

-- DropForeignKey
ALTER TABLE `hourWeek` DROP FOREIGN KEY `hourWeek_idHour_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_idHour_fkey`;

-- DropIndex
DROP INDEX `hours_idHour_key` ON `hours`;

-- AlterTable
ALTER TABLE `hourWeek` ADD COLUMN `tenant_id` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `hours_idHour_tenant_id_key` ON `hours`(`idHour`, `tenant_id`);

-- AddForeignKey
ALTER TABLE `hourWeek` ADD CONSTRAINT `hourWeek_idHour_tenant_id_fkey` FOREIGN KEY (`idHour`, `tenant_id`) REFERENCES `hours`(`idHour`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonAppointment` ADD CONSTRAINT `PersonAppointment_idHour_tenant_id_fkey` FOREIGN KEY (`idHour`, `tenant_id`) REFERENCES `hours`(`idHour`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_idHour_tenant_id_fkey` FOREIGN KEY (`idHour`, `tenant_id`) REFERENCES `hours`(`idHour`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
