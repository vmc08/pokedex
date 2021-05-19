/*
  Warnings:

  - You are about to drop the `Ability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StatValue" DROP CONSTRAINT "StatValue_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "StatValue" DROP CONSTRAINT "StatValue_statId_fkey";

-- DropForeignKey
ALTER TABLE "_AbilityToPokemon" DROP CONSTRAINT "_AbilityToPokemon_A_fkey";

-- DropForeignKey
ALTER TABLE "_AbilityToPokemon" DROP CONSTRAINT "_AbilityToPokemon_B_fkey";

-- DropForeignKey
ALTER TABLE "_PokemonToType" DROP CONSTRAINT "_PokemonToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_PokemonToType" DROP CONSTRAINT "_PokemonToType_B_fkey";

-- DropForeignKey
ALTER TABLE "_TypeToType" DROP CONSTRAINT "_TypeToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_TypeToType" DROP CONSTRAINT "_TypeToType_B_fkey";

-- DropTable
DROP TABLE "Ability";

-- DropTable
DROP TABLE "Pokemon";

-- DropTable
DROP TABLE "Stat";

-- DropTable
DROP TABLE "StatValue";

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "stat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effect" VARBIT(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon" (
    "id" SERIAL NOT NULL,
    "pokedex_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stat_value" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ability.name_unique" ON "ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "type.name_unique" ON "type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon.name_unique" ON "pokemon"("name");

-- AddForeignKey
ALTER TABLE "stat_value" ADD FOREIGN KEY ("statId") REFERENCES "stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stat_value" ADD FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToPokemon" ADD FOREIGN KEY ("A") REFERENCES "ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToPokemon" ADD FOREIGN KEY ("B") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD FOREIGN KEY ("B") REFERENCES "type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TypeToType" ADD FOREIGN KEY ("A") REFERENCES "type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TypeToType" ADD FOREIGN KEY ("B") REFERENCES "type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
