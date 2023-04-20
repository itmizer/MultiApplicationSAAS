/*
 Warnings:
 
 - The primary key for the `persons` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the `_CompanyToPerson` table. If the table is not empty, all the data it contains will be lost.
 - A unique constraint covering the columns `[idPlan,tenant_id]` on the table `plans` will be added. If there are existing duplicate values, this will fail.
 - A unique constraint covering the columns `[idService,tenant_id]` on the table `services` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `tenant_id` to the `personRecords` table without a default value. This is not possible if the table is not empty.
 - Made the column `tenant_id` on table `persons` required. This step will fail if there are existing NULL values in that column.
 
 */
-- DropForeignKey
ALTER TABLE
  `PersonAppointment` DROP FOREIGN KEY `PersonAppointment_idPerson_fkey`;

-- DropForeignKey
ALTER TABLE
  `WorkoutScore` DROP FOREIGN KEY `WorkoutScore_idPerson_fkey`;

-- DropForeignKey
ALTER TABLE
  `_CompanyToPerson` DROP FOREIGN KEY `_CompanyToPerson_A_fkey`;

-- DropForeignKey
ALTER TABLE
  `_CompanyToPerson` DROP FOREIGN KEY `_CompanyToPerson_B_fkey`;

-- DropForeignKey
ALTER TABLE
  `invoices` DROP FOREIGN KEY `invoices_idPerson_fkey`;

-- DropForeignKey
ALTER TABLE
  `invoices` DROP FOREIGN KEY `invoices_plan_fkey`;

-- DropForeignKey
ALTER TABLE
  `personRecords` DROP FOREIGN KEY `personRecords_idPerson_fkey`;

-- DropForeignKey
ALTER TABLE
  `planServices` DROP FOREIGN KEY `Plans `;

-- DropForeignKey
ALTER TABLE
  `planServices` DROP FOREIGN KEY `servicePlan`;

-- DropForeignKey
ALTER TABLE
  `reservations` DROP FOREIGN KEY `reservations_idPerson_fkey`;

-- DropForeignKey
ALTER TABLE
  `revenues` DROP FOREIGN KEY `revenues_idPerson_fkey`;

-- DropIndex
DROP INDEX `persons_idPerson_key` ON `persons`;

-- DropIndex
DROP INDEX `plans_idPlan_key` ON `plans`;

-- DropIndex
DROP INDEX `services_idService_key` ON `services`;

-- AlterTable
ALTER TABLE
  `personRecords`
ADD
  COLUMN `tenant_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE
  `persons` DROP PRIMARY KEY,
MODIFY
  `tenant_id` INTEGER NOT NULL,
ADD
  PRIMARY KEY (`idPerson`, `tenant_id`);

-- AlterTable
ALTER TABLE
  `planServices`
ADD
  COLUMN `tenant_id` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE
  `services`
MODIFY
  `tenant_id` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `_CompanyToPerson`;

-- CreateIndex
CREATE UNIQUE INDEX `plans_idPlan_tenant_id_key` ON `plans`(`idPlan`, `tenant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `services_idService_tenant_id_key` ON `services`(`idService`, `tenant_id`);

-- AddForeignKey
ALTER TABLE
  `persons`
ADD
  CONSTRAINT `persons_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `PersonAppointment`
ADD
  CONSTRAINT `PersonAppointment_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `planServices`
ADD
  CONSTRAINT `PlanService` FOREIGN KEY (`idPlan`, `tenant_id`) REFERENCES `plans`(`idPlan`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `planServices`
ADD
  CONSTRAINT `servicesPlan` FOREIGN KEY (`idService`, `tenant_id`) REFERENCES `services`(`idService`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `reservations`
ADD
  CONSTRAINT `reservations_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `invoices`
ADD
  CONSTRAINT `invoices_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `invoices`
ADD
  CONSTRAINT `invoices_plan_tenant_id_fkey` FOREIGN KEY (`plan`, `tenant_id`) REFERENCES `plans`(`idPlan`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `personRecords`
ADD
  CONSTRAINT `personRecords_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `revenues`
ADD
  CONSTRAINT `revenues_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `WorkoutScore`
ADD
  CONSTRAINT `WorkoutScore_idPerson_tenant_id_fkey` FOREIGN KEY (`idPerson`, `tenant_id`) REFERENCES `persons`(`idPerson`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;