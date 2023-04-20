/*
  Warnings:

  - A unique constraint covering the columns `[id,tenant_id]` on the table `contracts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `contracts_id_tenant_id_key` ON `contracts`(`id`, `tenant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `invoices_tenant_id_id_key` ON `invoices`(`tenant_id`, `id`);
