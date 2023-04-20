-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_idInvoice_fkey`;

-- DropForeignKey
ALTER TABLE `revenues` DROP FOREIGN KEY `revenues_idInvoice_fkey`;

-- DropIndex
DROP INDEX `invoices_id_key` ON `invoices`;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `revenueCode` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_idInvoice_tenant_id_fkey` FOREIGN KEY (`idInvoice`, `tenant_id`) REFERENCES `invoices`(`id`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_revenueCode_fkey` FOREIGN KEY (`revenueCode`) REFERENCES `revenues`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
