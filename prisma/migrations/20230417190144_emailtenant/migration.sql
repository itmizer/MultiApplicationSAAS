/*
  Warnings:

  - A unique constraint covering the columns `[email,tenant_id,cpf]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `persons_email_tenant_id_cpf_key` ON `persons`(`email`, `tenant_id`, `cpf`);
