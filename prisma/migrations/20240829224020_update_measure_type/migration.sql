/*
  Warnings:

  - You are about to alter the column `measure_type` on the `ReadImg` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `ReadImg` MODIFY `measure_type` VARCHAR(10) NOT NULL;
