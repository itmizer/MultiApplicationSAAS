/*
 Warnings:
 
 - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.
 
 */
-- DropForeignKey
ALTER TABLE
  `WorkoutScore` DROP FOREIGN KEY `fk_scoreWod`;

-- DropForeignKey
ALTER TABLE
  `workoutVideo` DROP FOREIGN KEY `fk_treinoVideo_has_treino_treino1`;

-- DropIndex
DROP INDEX `PersonAppointment_idHour_fkey` ON `PersonAppointment`;

-- DropIndex
DROP INDEX `PersonAppointment_idPerson_fkey` ON `PersonAppointment`;

-- DropTable
DROP TABLE `workout`;

-- CreateTable
CREATE TABLE `Workout` (
  `idWorkout` INTEGER NOT NULL AUTO_INCREMENT,
  `tenant_id` INTEGER NOT NULL,
  `service` INTEGER NOT NULL,
  `date` DATE NOT NULL,
  `type` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `idPerson` INTEGER NULL,
  `favorite` VARCHAR(45) NULL,
  PRIMARY KEY (`idWorkout`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `PersonApp_dayOfWeek_tenant_id_fkey` ON `PersonAppointment`(`dayOfWeek`, `tenant_id`, `idHour`, `idPerson`);

-- AddForeignKey
ALTER TABLE
  `Workout`
ADD
  CONSTRAINT `Workout_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `WorkoutScore`
ADD
  CONSTRAINT `fk_scoreWod` FOREIGN KEY (`idWorkout`) REFERENCES `Workout`(`idWorkout`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `workoutVideo`
ADD
  CONSTRAINT `fk_treinoVideo_has_treino_treino1` FOREIGN KEY (`wod`) REFERENCES `Workout`(`idWorkout`) ON DELETE CASCADE ON UPDATE CASCADE;