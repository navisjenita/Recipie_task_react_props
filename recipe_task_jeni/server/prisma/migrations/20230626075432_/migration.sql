/*
  Warnings:

  - You are about to alter the column `quantity` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
