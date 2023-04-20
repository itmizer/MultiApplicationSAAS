/*
  Warnings:

  - The primary key for the `hourWeek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[idHour,tenant_id,dayOfWeek]` on the table `hourWeek` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `hourWeek_idHour_dayOfWeek_key` ON `hourWeek`;

-- AlterTable
ALTER TABLE `hourWeek` DROP PRIMARY KEY,
    ALTER COLUMN `tenant_id` DROP DEFAULT,
    ADD PRIMARY KEY (`idHour`, `dayOfWeek`, `tenant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `hourWeek_idHour_tenant_id_dayOfWeek_key` ON `hourWeek`(`idHour`, `tenant_id`, `dayOfWeek`);
