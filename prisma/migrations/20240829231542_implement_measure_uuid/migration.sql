/*
  Warnings:

  - Added the required column `measure_uuid` to the `ReadImg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReadImg` ADD COLUMN `measure_uuid` VARCHAR(255) NOT NULL;
