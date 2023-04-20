-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_nContract_fkey`;

-- DropIndex
DROP INDEX `contracts_id_key` ON `contracts`;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_nContract_tenant_id_fkey` FOREIGN KEY (`nContract`, `tenant_id`) REFERENCES `contracts`(`id`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
