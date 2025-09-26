-- CreateTable
CREATE TABLE `task_status` (
    `id` TINYINT NOT NULL,
    `description` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(36) NOT NULL,
    `description` TINYTEXT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT (now()),
    `status` TINYINT NULL DEFAULT 1,
    `category` INTEGER NOT NULL,

    INDEX `fk_tasks_task_status`(`status`),
    INDEX `fk_tasks_tasks_category`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT (now()),
    `user_id` VARCHAR(36) NOT NULL,

    INDEX `fk_tasks_category_users`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(30) NOT NULL,
    `given_name` VARCHAR(36) NOT NULL,
    `family_name` VARCHAR(36) NOT NULL,
    `middle_name` VARCHAR(20) NULL,
    `suffix` VARCHAR(5) NULL,
    `created_at` DATETIME(0) NULL DEFAULT (now()),
    `updated_at` DATETIME(0) NULL DEFAULT (now()),
    `username` VARCHAR(36) NOT NULL,
    `password` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `fk_tasks_task_status` FOREIGN KEY (`status`) REFERENCES `task_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `fk_tasks_tasks_category` FOREIGN KEY (`category`) REFERENCES `tasks_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tasks_category` ADD CONSTRAINT `fk_tasks_category_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
