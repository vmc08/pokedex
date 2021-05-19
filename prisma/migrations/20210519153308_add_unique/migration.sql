/*
  Warnings:

  - A unique constraint covering the columns `[api_id]` on the table `ability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[api_id]` on the table `pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[api_id]` on the table `stat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[api_id]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ability.api_id_unique" ON "ability"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon.api_id_unique" ON "pokemon"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "stat.api_id_unique" ON "stat"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "type.api_id_unique" ON "type"("api_id");
