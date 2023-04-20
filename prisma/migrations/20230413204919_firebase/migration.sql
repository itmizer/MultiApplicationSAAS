-- AlterTable
ALTER TABLE `firebaseConfig` MODIFY `private_key` LONGTEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `firebaseConfig` ADD CONSTRAINT `firebaseConfig_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;
