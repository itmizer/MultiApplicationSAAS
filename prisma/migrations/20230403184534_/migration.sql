/*
  Warnings:

  - A unique constraint covering the columns `[idPerson,tenant_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `persons_email_tenant_id_profile_cpf_key` ON `persons`;

-- CreateIndex
CREATE UNIQUE INDEX `persons_idPerson_tenant_id_key` ON `persons`(`idPerson`, `tenant_id`);
