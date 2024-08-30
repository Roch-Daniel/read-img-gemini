-- CreateTable
CREATE TABLE `ReadImg` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `customer_code` VARCHAR(255) NOT NULL,
    `measure_datetime` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `measure_type` TINYINT NOT NULL,
    `measure_value` TINYINT NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `has_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
