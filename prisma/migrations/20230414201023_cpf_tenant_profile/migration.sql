/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,profile,cpf]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `persons_tenant_id_profile_cpf_key` ON `persons`(`tenant_id`, `profile`, `cpf`);
