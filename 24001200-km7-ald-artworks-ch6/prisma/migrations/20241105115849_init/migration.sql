-- CreateTable
CREATE TABLE "art_images" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageFieldId" TEXT NOT NULL,

    CONSTRAINT "art_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "art_images_imageFieldId_key" ON "art_images"("imageFieldId");
