/*
  Warnings:

  - Made the column `tenant_id` on table `typePayment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `typePayment` MODIFY `tenant_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `typePayment` ADD CONSTRAINT `typePayment_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;
