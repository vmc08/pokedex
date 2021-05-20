/*
  Warnings:

  - Added the required column `image` to the `pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "image" TEXT NOT NULL;
