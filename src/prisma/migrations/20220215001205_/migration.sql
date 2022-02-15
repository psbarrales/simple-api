-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
