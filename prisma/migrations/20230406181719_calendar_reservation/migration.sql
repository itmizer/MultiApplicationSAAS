-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_tenant_id_date_fkey` FOREIGN KEY (`tenant_id`, `date`) REFERENCES `calendar`(`tenant_id`, `date`) ON DELETE CASCADE ON UPDATE CASCADE;
