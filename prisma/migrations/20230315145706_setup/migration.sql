-- CreateTable
CREATE TABLE `company` (
    `idCompany` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `logomarca` LONGTEXT NULL,
    `NomeEmpresa` VARCHAR(45) NOT NULL,
    `cnpj` VARCHAR(45) NOT NULL,
    `razaosocial` VARCHAR(45) NULL,
    `logradouro` VARCHAR(45) NULL,
    `bairro` VARCHAR(45) NULL,
    `cep` VARCHAR(45) NULL,
    `cidade` VARCHAR(45) NULL,
    `estado` VARCHAR(45) NULL,
    `telefone` VARCHAR(45) NULL,
    `logradouroComplemento` VARCHAR(255) NULL,
    `url` VARCHAR(45) NULL,
    `segment` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL DEFAULT 'New',
    `email` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `company_idCompany_key`(`idCompany`),
    UNIQUE INDEX `company_code_key`(`code`),
    UNIQUE INDEX `company_cnpj_key`(`cnpj`),
    PRIMARY KEY (`idCompany`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persons` (
    `idPerson` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(45) NOT NULL,
    `sexo` VARCHAR(45) NULL,
    `phoneNumber` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `foto` LONGTEXT NULL,
    `uuid` VARCHAR(100) NULL,
    `token` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `dataNascimento` DATETIME(3) NULL,
    `cargo` VARCHAR(255) NULL,
    `dateActive` DATETIME(3) NULL,
    `dateInactive` DATE NULL,
    `profile` ENUM('CUSTOMER', 'STAFF', 'MANAGER', 'EMPLOYEE') NOT NULL DEFAULT 'CUSTOMER',
    `status` VARCHAR(255) NULL DEFAULT 'new',
    `tenant_id` INTEGER NULL,
    `contact` VARCHAR(255) NULL,
    `datePayment` INTEGER NULL,

    UNIQUE INDEX `persons_idPerson_key`(`idPerson`),
    UNIQUE INDEX `persons_email_tenant_id_profile_cpf_key`(`email`, `tenant_id`, `profile`, `cpf`),
    PRIMARY KEY (`idPerson`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menuApp` (
    `idMenu` INTEGER NOT NULL AUTO_INCREMENT,
    `icon` VARCHAR(45) NULL,
    `url` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL,
    `nivel` VARCHAR(45) NULL,
    `nivelAcesso` VARCHAR(45) NULL,
    `role` VARCHAR(45) NULL,
    `tenant_id` INTEGER NULL,
    `title` VARCHAR(255) NULL,

    INDEX `fk_menuAppPerson`(`tenant_id`),
    PRIMARY KEY (`idMenu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calendar` (
    `date` DATE NOT NULL,
    `type` BOOLEAN NOT NULL,
    `day` VARCHAR(45) NULL,
    `month` VARCHAR(45) NULL,
    `year` YEAR NULL,
    `weekday` VARCHAR(45) NULL,
    `mes` VARCHAR(45) NULL,
    `weekname` VARCHAR(45) NULL,
    `quarterly` VARCHAR(45) NULL,
    `tenant_id` INTEGER NOT NULL,

    INDEX `fk_calendarioCompany_idx`(`tenant_id`),
    PRIMARY KEY (`date`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(255) NOT NULL,
    `data` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `topic` VARCHAR(191) NULL,
    `tenant_id` INTEGER NULL,
    `idPerson` INTEGER NULL,
    `status` VARCHAR(50) NULL,

    UNIQUE INDEX `notifications_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hours` (
    `idHour` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `hourStart` TIME(0) NOT NULL,
    `hourEnd` VARCHAR(191) NULL,
    `vacancy` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `typeHour` VARCHAR(45) NULL,
    `creditBonus` VARCHAR(99) NULL,
    `service` INTEGER NOT NULL,
    `tipoReservation` VARCHAR(45) NULL DEFAULT 'Normal',

    UNIQUE INDEX `hours_idHour_key`(`idHour`),
    INDEX `fk_serviceHour`(`service`),
    INDEX `hourTenant`(`tenant_id`),
    PRIMARY KEY (`idHour`, `service`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hourWeek` (
    `idHour` INTEGER NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `coach` INTEGER NULL,
    `vacancy` INTEGER NULL,

    UNIQUE INDEX `hourWeek_idHour_dayOfWeek_key`(`idHour`, `dayOfWeek`),
    PRIMARY KEY (`idHour`, `dayOfWeek`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonAppointment` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `idHour` INTEGER NOT NULL,
    `idPerson` INTEGER NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `tenant_id` INTEGER NOT NULL,

    UNIQUE INDEX `PersonAppointment_code_key`(`code`),
    INDEX `PersonAppointment_dayOfWeek_tenant_id_fkey`(`dayOfWeek`, `tenant_id`),
    INDEX `PersonAppointment_idHour_fkey`(`idHour`),
    INDEX `PersonAppointment_idPerson_fkey`(`idPerson`),
    INDEX `PersonAppointment_tenant_id_fkey`(`tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `idPlan` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NULL,
    `typePeriod` VARCHAR(45) NULL,
    `qtdPeriod` INTEGER NOT NULL,
    `daysOfWeek` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `taxRegistration` DOUBLE NULL,
    `gracePeriod` INTEGER NULL,
    `responsibleUpdated` VARCHAR(191) NULL,
    `typeUse` VARCHAR(45) NULL,
    `tenant_id` INTEGER NOT NULL,
    `promotional` BOOLEAN NOT NULL DEFAULT false,
    `acumulative` BOOLEAN NOT NULL DEFAULT false,
    `created_dt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_dt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `plans_idPlan_key`(`idPlan`),
    INDEX `plans_tenant_id_fkey`(`tenant_id`),
    PRIMARY KEY (`idPlan`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planServices` (
    `idPlan` INTEGER NOT NULL,
    `idService` INTEGER NOT NULL,
    `qtdSemana` VARCHAR(45) NULL,
    `valor` VARCHAR(45) NULL,

    INDEX `servicePlan`(`idService`),
    PRIMARY KEY (`idPlan`, `idService`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `idReservation` INTEGER NOT NULL AUTO_INCREMENT,
    `idPerson` INTEGER NOT NULL,
    `idHour` INTEGER NOT NULL,
    `idInvoice` INTEGER NULL,
    `service` INTEGER NULL,
    `date` DATE NOT NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'Gerada',
    `experimental` INTEGER NULL,
    `tenant_id` INTEGER NOT NULL,
    `hourCancel` DATETIME(0) NULL,
    `hourReservation` DATETIME(0) NULL,
    `typeReservation` VARCHAR(255) NULL,

    UNIQUE INDEX `reservations_idReservation_key`(`idReservation`),
    INDEX `reservations_date_tenant_id_fkey`(`tenant_id`),
    INDEX `reservations_idHour_fkey`(`idHour`),
    INDEX `reservations_idInvoice_fkey`(`idInvoice`),
    INDEX `reservations_idPerson_fkey`(`idPerson`),
    PRIMARY KEY (`idReservation`, `idPerson`, `idHour`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `firebaseConfig` (
    `tenant_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `private_key_id` VARCHAR(191) NOT NULL,
    `private_key` VARCHAR(191) NOT NULL,
    `client_email` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `auth_uri` VARCHAR(191) NOT NULL,
    `token_uri` VARCHAR(191) NOT NULL,
    `auth_provider_x509_cert_url` VARCHAR(191) NOT NULL,
    `client_x509_cert_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `firebaseConfig_tenant_id_key`(`tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPerson` INTEGER NOT NULL,
    `tenant_id` INTEGER NOT NULL,
    `plan` INTEGER NOT NULL,
    `typePayment` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL DEFAULT 'Gerada',
    `installments` INTEGER NULL,
    `nContract` INTEGER NULL,
    `dateStart` DATE NULL,
    `amount` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `amountInvoice` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `amountDiscount` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `amountTrade` DECIMAL(10, 2) NULL,
    `dtConfirmation` DATE NULL,
    `dtCreated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dtDue` DATE NULL,
    `dtEnd` DATE NULL,
    `dtPayment` DATE NULL,
    `observation` VARCHAR(255) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_id_key`(`id`),
    INDEX `Invoice_idPerson_fkey`(`idPerson`),
    INDEX `Invoice_nContract_fkey`(`nContract`),
    INDEX `Invoice_plan_fkey`(`plan`),
    INDEX `Invoice_tenant_id_fkey`(`tenant_id`),
    PRIMARY KEY (`id`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benchmark` (
    `idBenchmark` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NULL,
    `title` VARCHAR(45) NULL,

    PRIMARY KEY (`idBenchmark`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contracts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPerson` INTEGER NOT NULL,
    `plan` INTEGER NOT NULL,
    `tenant_id` INTEGER NOT NULL,
    `idAssign` VARCHAR(255) NULL,
    `dateStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `taxRegistration` DECIMAL(10, 2) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `amountTrade` DECIMAL(10, 2) NULL,
    `dateEnd` DATETIME(3) NULL,
    `typeDoc` VARCHAR(45) NULL DEFAULT 'contract',
    `typePayment` VARCHAR(45) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `period` INTEGER NOT NULL,

    UNIQUE INDEX `contracts_id_key`(`id`),
    INDEX `contracts_typePayment_fkey`(`typePayment`),
    PRIMARY KEY (`id`, `idPerson`, `tenant_id`, `plan`, `dateStart`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idfornecedor` INTEGER NULL,
    `referencia` VARCHAR(255) NULL,
    `tipo_pagamento` VARCHAR(255) NOT NULL,
    `numero_doc` VARCHAR(255) NOT NULL,
    `serie` VARCHAR(20) NULL,
    `dataPagamento` DATE NOT NULL,
    `valorPagamento` DECIMAL(10, 2) NOT NULL,
    `forma_pagamento` VARCHAR(255) NOT NULL,
    `dataEmissao` DATE NULL,
    `dataVencimento` DATE NULL,
    `NumParcela` VARCHAR(20) NULL,
    `ValorAcrescimo` VARCHAR(255) NULL,
    `ValorDesconto` VARCHAR(255) NULL,
    `observacao` TEXT NULL,
    `status` VARCHAR(45) NULL,
    `responsavel` VARCHAR(255) NULL,
    `dataLancamento` DATETIME(0) NULL,
    `ultimaAlteracao` DATETIME(0) NULL,
    `description` VARCHAR(255) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experimental` (
    `idexperimental` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCompleto` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(50) NULL,
    `foto` VARCHAR(45) NULL,
    `dataExperimental` DATE NULL,
    `horario` VARCHAR(45) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`idexperimental`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feed` (
    `idFeed` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` INTEGER NULL,
    `status` VARCHAR(45) NULL,
    `liberacao` VARCHAR(45) NULL,
    `data` DATE NULL,
    `foto` LONGTEXT NULL,
    `description` TEXT NULL,
    `tenant_id` INTEGER NOT NULL,
    `title` VARCHAR(45) NULL,

    INDEX `fk_feed_company1_idx`(`tenant_id`),
    PRIMARY KEY (`idFeed`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flowCash` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `revenueCode` INTEGER NOT NULL,
    `date` DATE NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `tipoPagamento` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL,
    `type` VARCHAR(45) NOT NULL,
    `extorno` VARCHAR(45) NULL,
    `initialBalance` DECIMAL(65, 30) NULL,
    `Balance` DECIMAL(65, 30) NULL,
    `finalBalance` DECIMAL(65, 30) NULL,

    UNIQUE INDEX `flowCash_id_key`(`id`),
    PRIMARY KEY (`revenueCode`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personRecords` (
    `idRecord` INTEGER NOT NULL AUTO_INCREMENT,
    `record` INTEGER NOT NULL,
    `Carga` VARCHAR(45) NULL,
    `DataAvaliacao` DATE NULL,
    `tempo` VARCHAR(45) NULL,
    `reps` VARCHAR(45) NULL,
    `cargaLbs` VARCHAR(45) NULL,
    `cargakgs` VARCHAR(45) NULL,
    `idcoach` VARCHAR(45) NULL,
    `idPerson` INTEGER NOT NULL,

    INDEX `fk_Clientes_Records_PersonalRecords1_idx`(`record`),
    INDEX `personRecords_idPerson_fkey`(`idPerson`),
    PRIMARY KEY (`idRecord`, `record`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalRecords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(45) NULL,
    `name` VARCHAR(100) NULL,
    `type` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revenues` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `idInvoice` INTEGER NULL,
    `idPerson` INTEGER NOT NULL,
    `typePayment` VARCHAR(255) NULL,
    `datePayment` DATE NOT NULL,
    `amount` DECIMAL(10, 2) NULL,
    `status` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `extra` VARCHAR(45) NULL,
    `type` VARCHAR(45) NULL,

    UNIQUE INDEX `revenues_code_key`(`code`),
    UNIQUE INDEX `revenues_idInvoice_key`(`idInvoice`),
    INDEX `revenues_idPerson_fkey`(`idPerson`),
    UNIQUE INDEX `revenues_tenant_id_idInvoice_idPerson_key`(`tenant_id`, `idInvoice`, `idPerson`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `idService` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `category` VARCHAR(45) NULL,
    `Descritivo` TEXT NOT NULL,
    `status` VARCHAR(45) NULL,
    `valorDiaria` VARCHAR(45) NULL,
    `TipoAula` VARCHAR(45) NULL,
    `valor` VARCHAR(45) NULL,
    `custo` VARCHAR(45) NULL,
    `tempoServico` TIME(0) NULL,
    `ultimaAlteracao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tenant_id` INTEGER NOT NULL,
    `Reservation` VARCHAR(45) NULL,

    UNIQUE INDEX `services_idService_key`(`idService`),
    INDEX `fk_services_company1_idx`(`tenant_id`),
    PRIMARY KEY (`idService`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sugestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` VARCHAR(45) NULL,
    `cliente` INTEGER NULL,
    `anonimo` INTEGER NULL,
    `tenant_id` INTEGER NOT NULL,
    `description` TEXT NULL,
    `title` VARCHAR(45) NULL,

    INDEX `fk_sugestao_company1`(`tenant_id`),
    PRIMARY KEY (`id`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfigCompany` (
    `idConfig` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `nome` VARCHAR(45) NULL,
    `tipo` VARCHAR(45) NULL,
    `params` VARCHAR(45) NULL,
    `ultimaAlteracao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `responsavel` VARCHAR(255) NULL,
    `imagem` LONGTEXT NULL,
    `valor` TEXT NULL,
    `description` MEDIUMTEXT NULL,

    INDEX `ConfigCompany_tenant_id_fkey`(`tenant_id`),
    PRIMARY KEY (`idConfig`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typePayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `tenant_id` INTEGER NULL,
    `type` VARCHAR(255) NULL,

    UNIQUE INDEX `typePayment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videosList` (
    `idtreinoVideo` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idtreinoVideo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `webHook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout` (
    `idWorkout` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NULL,
    `data` VARCHAR(45) NULL,
    `modalidade` INTEGER NOT NULL,
    `Benchmark` VARCHAR(45) NULL,
    `videos` TEXT NULL,
    `cliente` INTEGER NULL,
    `favorito` VARCHAR(45) NULL,
    `coach` VARCHAR(45) NULL,
    `descriptionTreino` TEXT NULL,
    `tenant_id` INTEGER NULL,

    UNIQUE INDEX `workout_idWorkout_key`(`idWorkout`),
    PRIMARY KEY (`idWorkout`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkoutScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idWorkout` INTEGER NOT NULL,
    `tenant_id` INTEGER NOT NULL,
    `idPerson` INTEGER NOT NULL,
    `dateScore` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `category` VARCHAR(45) NULL,
    `time` VARCHAR(45) NULL,
    `reps` INTEGER NULL,
    `rounds` VARCHAR(45) NULL,
    `cargaKG` VARCHAR(45) NULL,
    `cargaLbs` VARCHAR(45) NULL,

    INDEX `WorkoutScore_idPerson_fkey`(`idPerson`),
    INDEX `WorkoutScore_tenant_id_fkey`(`tenant_id`),
    INDEX `fk_scoreWod`(`idWorkout`),
    PRIMARY KEY (`id`, `idWorkout`, `idPerson`, `dateScore`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workoutVideo` (
    `video_id` INTEGER NOT NULL,
    `wod` INTEGER NOT NULL,

    INDEX `fk_treinoVideo_has_treino_treino1_idx`(`wod`),
    INDEX `fk_treinoVideo_has_treino_treinoVideo1_idx`(`video_id`),
    PRIMARY KEY (`video_id`, `wod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calendarWeek` (
    `day` INTEGER NOT NULL,
    `typeDay` BOOLEAN NOT NULL,
    `tenant_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    INDEX `calendarWeek_tenant_id_fkey`(`tenant_id`),
    UNIQUE INDEX `calendarWeek_day_tenant_id_key`(`day`, `tenant_id`),
    PRIMARY KEY (`day`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider` (
    `idfornecedor` INTEGER NOT NULL AUTO_INCREMENT,
    `NomeFornecedor` VARCHAR(255) NULL,
    `cnpj` VARCHAR(255) NULL,
    `cpf` VARCHAR(255) NULL,
    `razaosocial` VARCHAR(255) NULL,
    `logradouro` VARCHAR(255) NULL,
    `bairro` VARCHAR(255) NULL,
    `cep` VARCHAR(255) NULL,
    `cidade` VARCHAR(255) NULL,
    `estado` VARCHAR(255) NULL,
    `telefone` VARCHAR(255) NULL,
    `logradouroComplemento` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,

    UNIQUE INDEX `idfornecedor_UNIQUE`(`idfornecedor`),
    PRIMARY KEY (`idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inboundItem` (
    `seqInbound` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,
    `quantidade` VARCHAR(45) NULL,
    `valor` VARCHAR(255) NULL,
    `valorTotal` VARCHAR(45) NULL,

    PRIMARY KEY (`seqInbound`, `idProduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inboundStock` (
    `idInbbound` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,
    `provider` INTEGER NOT NULL,
    `dateInbound` DATE NULL,
    `tipoDoc` VARCHAR(45) NULL,
    `serie` VARCHAR(45) NULL,
    `numeroDoc` VARCHAR(45) NULL,
    `valorTotal` VARCHAR(45) NULL,
    `responsavel` VARCHAR(255) NULL,
    `status` VARCHAR(45) NULL,

    UNIQUE INDEX `identradas_UNIQUE`(`idInbbound`),
    INDEX `fk_inboundStock_product1_idx`(`idInbbound`, `tenant_id`),
    PRIMARY KEY (`idInbbound`, `idProduct`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outboundStock` (
    `idOutbound` INTEGER NOT NULL AUTO_INCREMENT,
    `dataSaida` DATE NULL,
    `cliente` VARCHAR(255) NULL,
    `tipoPagamento` VARCHAR(255) NULL,
    `responsavel` VARCHAR(255) NULL,
    `observacao` VARCHAR(255) NULL,
    `status` VARCHAR(45) NULL,
    `valorTotal` VARCHAR(45) NULL,
    `product_idProdutos` INTEGER NOT NULL,
    `product_idfornecedor` INTEGER NOT NULL,
    `product_empresa` INTEGER NOT NULL,

    UNIQUE INDEX `idOutbound`(`idOutbound`),
    INDEX `fk_outboundStock_product1_idx`(`product_idProdutos`, `product_idfornecedor`, `product_empresa`),
    PRIMARY KEY (`idOutbound`, `product_idProdutos`, `product_idfornecedor`, `product_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outboundStockItens` (
    `idOutbound` INTEGER NOT NULL,
    `idProdutos` INTEGER NOT NULL,
    `quantidade` VARCHAR(45) NULL,
    `valorUnitario` VARCHAR(45) NULL,
    `valorTotal` VARCHAR(45) NULL,
    `observacao` VARCHAR(45) NULL,

    INDEX `fk_Produtos_has_saidas_Produtos1_idx`(`idProdutos`),
    INDEX `fk_Produtos_has_saidas_saidas1_idx`(`idOutbound`),
    PRIMARY KEY (`idOutbound`, `idProdutos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `idProduct` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `category` INTEGER NOT NULL,
    `codeProduct` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `codeBar` VARCHAR(255) NULL,
    `QtdEstoque` VARCHAR(255) NULL DEFAULT '0',
    `valorVenda` VARCHAR(45) NULL,
    `tipoProduto` VARCHAR(255) NULL,
    `foto` LONGTEXT NULL,
    `stockControl` INTEGER NULL,
    `tipo` VARCHAR(45) NULL,
    `classificacao` VARCHAR(45) NULL,

    UNIQUE INDEX `product_idProduct_key`(`idProduct`),
    INDEX `fk_Produtos_empresa1`(`tenant_id`),
    INDEX `fk_categoriaProduct_idx`(`category`),
    PRIMARY KEY (`idProduct`, `tenant_id`, `category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productCategory` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `idfornecedor` INTEGER NOT NULL,
    `foto` LONGTEXT NULL,
    `description` VARCHAR(255) NULL,
    `tenant_id` INTEGER NOT NULL,

    UNIQUE INDEX `productCategory_idCategoria_key`(`idCategoria`),
    PRIMARY KEY (`idCategoria`, `tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompanyToPerson` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CompanyToPerson_AB_unique`(`A`, `B`),
    INDEX `_CompanyToPerson_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menuApp` ADD CONSTRAINT `menuApp_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calendar` ADD CONSTRAINT `fk_companyCalendar` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hours` ADD CONSTRAINT `hours_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hourWeek` ADD CONSTRAINT `hourWeek_idHour_fkey` FOREIGN KEY (`idHour`) REFERENCES `hours`(`idHour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonAppointment` ADD CONSTRAINT `PersonAppointment_dayOfWeek_tenant_id_fkey` FOREIGN KEY (`dayOfWeek`, `tenant_id`) REFERENCES `calendarWeek`(`day`, `tenant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonAppointment` ADD CONSTRAINT `PersonAppointment_idHour_fkey` FOREIGN KEY (`idHour`) REFERENCES `hours`(`idHour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonAppointment` ADD CONSTRAINT `PersonAppointment_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonAppointment` ADD CONSTRAINT `PersonAppointment_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plans` ADD CONSTRAINT `plans_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `planServices` ADD CONSTRAINT `Plans ` FOREIGN KEY (`idPlan`) REFERENCES `plans`(`idPlan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `planServices` ADD CONSTRAINT `servicePlan` FOREIGN KEY (`idService`) REFERENCES `services`(`idService`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_idHour_fkey` FOREIGN KEY (`idHour`) REFERENCES `hours`(`idHour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_idInvoice_fkey` FOREIGN KEY (`idInvoice`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_nContract_fkey` FOREIGN KEY (`nContract`) REFERENCES `contracts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_plan_fkey` FOREIGN KEY (`plan`) REFERENCES `plans`(`idPlan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contracts` ADD CONSTRAINT `contracts_typePayment_fkey` FOREIGN KEY (`typePayment`) REFERENCES `typePayment`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personRecords` ADD CONSTRAINT `personRecords_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personRecords` ADD CONSTRAINT `personRecords_record_fkey` FOREIGN KEY (`record`) REFERENCES `PersonalRecords`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenues` ADD CONSTRAINT `revenues_idInvoice_fkey` FOREIGN KEY (`idInvoice`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenues` ADD CONSTRAINT `revenues_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenues` ADD CONSTRAINT `revenues_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `fk_services_company1` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sugestion` ADD CONSTRAINT `fk_sugestao_company1` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigCompany` ADD CONSTRAINT `ConfigCompany_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutScore` ADD CONSTRAINT `WorkoutScore_idPerson_fkey` FOREIGN KEY (`idPerson`) REFERENCES `persons`(`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutScore` ADD CONSTRAINT `WorkoutScore_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutScore` ADD CONSTRAINT `fk_scoreWod` FOREIGN KEY (`idWorkout`) REFERENCES `workout`(`idWorkout`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workoutVideo` ADD CONSTRAINT `fk_treinoVideo_has_treino_treino1` FOREIGN KEY (`wod`) REFERENCES `workout`(`idWorkout`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workoutVideo` ADD CONSTRAINT `fk_treinoVideo_has_treino_treinoVideo1` FOREIGN KEY (`video_id`) REFERENCES `videosList`(`idtreinoVideo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calendarWeek` ADD CONSTRAINT `calendarWeek_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inboundItem` ADD CONSTRAINT `productItens` FOREIGN KEY (`seqInbound`) REFERENCES `inboundStock`(`idInbbound`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outboundStockItens` ADD CONSTRAINT `fk_Produtos_has_saidas_saidas1` FOREIGN KEY (`idOutbound`) REFERENCES `outboundStock`(`idOutbound`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_Produtos_empresa1` FOREIGN KEY (`tenant_id`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_categoriaProduct` FOREIGN KEY (`category`) REFERENCES `productCategory`(`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToPerson` ADD CONSTRAINT `_CompanyToPerson_A_fkey` FOREIGN KEY (`A`) REFERENCES `company`(`idCompany`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToPerson` ADD CONSTRAINT `_CompanyToPerson_B_fkey` FOREIGN KEY (`B`) REFERENCES `persons`(`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;
