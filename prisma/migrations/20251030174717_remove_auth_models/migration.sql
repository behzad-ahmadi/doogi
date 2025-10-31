/*
  Warnings:

  - You are about to drop the column `childId` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `words` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `children` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."children" DROP CONSTRAINT "children_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_wordId_fkey";

-- DropForeignKey
ALTER TABLE "public"."likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."likes" DROP CONSTRAINT "likes_wordId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."words" DROP CONSTRAINT "words_childId_fkey";

-- DropForeignKey
ALTER TABLE "public"."words" DROP CONSTRAINT "words_userId_fkey";

-- AlterTable
ALTER TABLE "public"."words" DROP COLUMN "childId",
DROP COLUMN "userId",
ADD COLUMN     "childName" TEXT,
ALTER COLUMN "isPublic" SET DEFAULT true;

-- DropTable
DROP TABLE "public"."accounts";

-- DropTable
DROP TABLE "public"."children";

-- DropTable
DROP TABLE "public"."comments";

-- DropTable
DROP TABLE "public"."likes";

-- DropTable
DROP TABLE "public"."sessions";

-- DropTable
DROP TABLE "public"."users";

-- DropTable
DROP TABLE "public"."verification_tokens";

-- DropEnum
DROP TYPE "public"."Role";
