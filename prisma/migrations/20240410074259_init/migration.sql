-- CreateEnum
CREATE TYPE "TERMS_TYPE" AS ENUM ('SERVICE', 'PRIVACY', 'AGE_LIMIT', 'MARKETING');

-- CreateEnum
CREATE TYPE "OAUT_PROVIDER" AS ENUM ('GOOGLE', 'KAKAO', 'NAVER');

-- CreateEnum
CREATE TYPE "CERTIFICATION_TARGET_TYPE" AS ENUM ('PHONE');

-- CreateEnum
CREATE TYPE "CERTIFICATION_TYPE" AS ENUM ('SIGN_UP', 'FIND_PASSWORD');

-- CreateEnum
CREATE TYPE "CERTIFICATION_STATUS" AS ENUM ('PENDING', 'VERIFIED', 'SUCCESS', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PARKING_STATUS" AS ENUM ('PARKING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPE" AS ENUM ('SYSTEM', 'PARKING', 'REPUTATION', 'MESSAGE', 'EVENT');

-- CreateEnum
CREATE TYPE "REPUTATION_TYPE" AS ENUM ('FAST_RESPONSE', 'KINDNESS', 'PUNCTUALITY');

-- CreateEnum
CREATE TYPE "IMAGE_TYPE" AS ENUM ('PROFILE', 'CAR');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contry_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_snapshot" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contry_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_last_snapshot" (
    "user_id" UUID NOT NULL,
    "snapshot_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_last_snapshot_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profile_image" (
    "user_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_image_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "terms_agreements" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "TERMS_TYPE" NOT NULL,
    "agree" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "terms_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "provider" "OAUT_PROVIDER" NOT NULL,
    "provider_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oauth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification" (
    "id" UUID NOT NULL,
    "certification_code_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "targetType" "CERTIFICATION_TARGET_TYPE" NOT NULL,
    "type" "CERTIFICATION_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_code" (
    "id" UUID NOT NULL,
    "targetType" "CERTIFICATION_TARGET_TYPE" NOT NULL,
    "type" "CERTIFICATION_TYPE" NOT NULL,
    "status" "CERTIFICATION_STATUS" NOT NULL,
    "code" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certification_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_image" (
    "id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_snapshot" (
    "id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driving" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking" (
    "id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "drivingId" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "PARKING_STATUS" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking_snapshot" (
    "id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "drivingId" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "PARKING_STATUS" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parking_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "NOTIFICATION_TYPE" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_reputation" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "writer_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_reputation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_reputation_reason" (
    "id" UUID NOT NULL,
    "user_reputation_id" UUID NOT NULL,
    "type" "REPUTATION_TYPE" NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_reputation_reason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "IMAGE_TYPE" NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_key" ON "user"("account");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_last_snapshot_snapshot_id_key" ON "user_last_snapshot"("snapshot_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_image_image_id_key" ON "user_profile_image"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "terms_agreements_user_id_type_key" ON "terms_agreements"("user_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_provider_provider_id_key" ON "oauth"("provider", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_user_id_provider_key" ON "oauth"("user_id", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "certification_certification_code_id_key" ON "certification"("certification_code_id");

-- CreateIndex
CREATE UNIQUE INDEX "certification_user_id_type_key" ON "certification"("user_id", "type");

-- CreateIndex
CREATE INDEX "certification_code_target_idx" ON "certification_code"("target");

-- CreateIndex
CREATE INDEX "certification_code_target_status_idx" ON "certification_code"("target", "status");

-- CreateIndex
CREATE INDEX "certification_code_created_at_idx" ON "certification_code"("created_at");

-- CreateIndex
CREATE INDEX "certification_code_target_created_at_idx" ON "certification_code"("target", "created_at");

-- CreateIndex
CREATE INDEX "certification_code_expired_at_idx" ON "certification_code"("expired_at");

-- CreateIndex
CREATE UNIQUE INDEX "car_number_key" ON "car"("number");

-- CreateIndex
CREATE UNIQUE INDEX "car_snapshot_number_key" ON "car_snapshot"("number");

-- CreateIndex
CREATE UNIQUE INDEX "parking_car_id_drivingId_key" ON "parking"("car_id", "drivingId");

-- AddForeignKey
ALTER TABLE "user_snapshot" ADD CONSTRAINT "user_snapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_last_snapshot" ADD CONSTRAINT "user_last_snapshot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_last_snapshot" ADD CONSTRAINT "user_last_snapshot_snapshot_id_fkey" FOREIGN KEY ("snapshot_id") REFERENCES "user_snapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_image" ADD CONSTRAINT "user_profile_image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_image" ADD CONSTRAINT "user_profile_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms_agreements" ADD CONSTRAINT "terms_agreements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth" ADD CONSTRAINT "oauth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_certification_code_id_fkey" FOREIGN KEY ("certification_code_id") REFERENCES "certification_code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_image" ADD CONSTRAINT "car_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_image" ADD CONSTRAINT "car_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_snapshot" ADD CONSTRAINT "car_snapshot_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driving" ADD CONSTRAINT "driving_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driving" ADD CONSTRAINT "driving_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking" ADD CONSTRAINT "parking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking" ADD CONSTRAINT "parking_drivingId_fkey" FOREIGN KEY ("drivingId") REFERENCES "driving"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_snapshot" ADD CONSTRAINT "parking_snapshot_car_id_drivingId_fkey" FOREIGN KEY ("car_id", "drivingId") REFERENCES "parking"("car_id", "drivingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reputation" ADD CONSTRAINT "user_reputation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reputation" ADD CONSTRAINT "user_reputation_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reputation_reason" ADD CONSTRAINT "user_reputation_reason_user_reputation_id_fkey" FOREIGN KEY ("user_reputation_id") REFERENCES "user_reputation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
