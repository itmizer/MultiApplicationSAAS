-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_service_tenant_id_fkey` FOREIGN KEY (`service`, `tenant_id`) REFERENCES `services`(`idService`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
