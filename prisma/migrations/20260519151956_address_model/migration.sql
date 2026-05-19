-- CreateEnum
CREATE TYPE "ADDRESS_TYPE" AS ENUM ('HOME', 'WORK');

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressType" "ADDRESS_TYPE" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
