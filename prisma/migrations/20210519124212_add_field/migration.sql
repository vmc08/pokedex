/*
  Warnings:

  - You are about to drop the column `pokedex_number` on the `pokemon` table. All the data in the column will be lost.
  - Added the required column `api_id` to the `ability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `api_id` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `api_id` to the `stat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `api_id` to the `type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ability" ADD COLUMN     "api_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pokemon" DROP COLUMN "pokedex_number",
ADD COLUMN     "api_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stat" ADD COLUMN     "api_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "type" ADD COLUMN     "api_id" INTEGER NOT NULL;
