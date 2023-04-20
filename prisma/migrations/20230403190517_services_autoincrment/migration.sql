-- DropForeignKey
ALTER TABLE `planServices` DROP FOREIGN KEY `PlanService`;

-- DropForeignKey
ALTER TABLE `planServices` DROP FOREIGN KEY `servicesPlan`;

-- DropIndex
DROP INDEX `servicePlan` ON `planServices`;

-- AlterTable
ALTER TABLE `services` MODIFY `idService` INTEGER NOT NULL AUTO_INCREMENT,
    ALTER COLUMN `tenant_id` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `planServices` ADD CONSTRAINT `planServices_idPlan_tenant_id_fkey` FOREIGN KEY (`idPlan`, `tenant_id`) REFERENCES `plans`(`idPlan`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `planServices` ADD CONSTRAINT `planServices_idService_tenant_id_fkey` FOREIGN KEY (`idService`, `tenant_id`) REFERENCES `services`(`idService`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
