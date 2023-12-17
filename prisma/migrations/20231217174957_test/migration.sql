/*
  Warnings:

  - You are about to drop the column `name` on the `profile` table. All the data in the column will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "club" TEXT,
ADD COLUMN     "isVintage" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."profile" DROP COLUMN "name";
