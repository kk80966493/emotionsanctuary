CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`characterId` varchar(50) NOT NULL,
	`playerName` varchar(255),
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
