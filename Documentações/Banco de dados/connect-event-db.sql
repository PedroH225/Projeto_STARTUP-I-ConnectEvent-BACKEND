-- Schema
DROP SCHEMA IF EXISTS `connect-event-db`;
CREATE SCHEMA `connect-event-db`;
USE `connect-event-db`;

-- Tabela Usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(60) NOT NULL,
  `idade` INT NOT NULL,
  `genero` VARCHAR(40) NOT NULL,
  `cidade` VARCHAR(30),
  `estado` VARCHAR(30)
) ENGINE = InnoDB;

-- Tabela Amigos
CREATE TABLE IF NOT EXISTS `amigos` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `amigo_id` INT NOT NULL,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`amigo_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Empresario
CREATE TABLE IF NOT EXISTS `empresario` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(60) NOT NULL
) ENGINE = InnoDB;

-- Tabela Endereco
CREATE TABLE IF NOT EXISTS `endereco` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `local` VARCHAR(100),
  `estado` VARCHAR(30),
  `bairro` VARCHAR(50),
  `cidade` VARCHAR(30),
  `numero` INT
) ENGINE = InnoDB;

-- Tabela Evento
CREATE TABLE IF NOT EXISTS `evento` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `data` DATE NOT NULL,
  `horario` TIME NOT NULL,
  `tipo` VARCHAR(100) NOT NULL,
  `telefone` VARCHAR(20),
  `livre` BOOLEAN,
  `link` VARCHAR(100) NOT NULL,
  `endereco_id` INT,
  `empresario_id` INT,
  FOREIGN KEY (`endereco_id`) REFERENCES `endereco`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`empresario_id`) REFERENCES `empresario`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Foto
CREATE TABLE IF NOT EXISTS `foto` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `foto` VARCHAR(100) NOT NULL,
  `evento_id` INT NOT NULL,
  FOREIGN KEY (`evento_id`) REFERENCES `evento`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Usuario_Evento
CREATE TABLE IF NOT EXISTS `usuario_evento` (
  `usuario_id` INT NOT NULL,
  `evento_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `evento_id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`evento_id`) REFERENCES `evento`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Interacao
CREATE TABLE IF NOT EXISTS `interacao` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `evento_id` INT NOT NULL,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`evento_id`) REFERENCES `evento`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Pedido_Amizade
CREATE TABLE IF NOT EXISTS `pedido_amizade` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `amigo_id` INT NOT NULL,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`amigo_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Tabela Notificacao
CREATE TABLE IF NOT EXISTS `notificacao` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(150) NOT NULL,
  `linkEvento` VARCHAR(100) NOT NULL,
  `data` DATE NOT NULL
) ENGINE = InnoDB;

-- Tabela Notificacao_Usuario
CREATE TABLE IF NOT EXISTS `notificacao_usuario` (
  `notificacao_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`notificacao_id`, `usuario_id`),
  FOREIGN KEY (`notificacao_id`) REFERENCES `notificacao`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Inserindo dados na tabela Usuario
INSERT INTO `usuario` (`nome`, `email`, `senha`, `idade`, `genero`, `cidade`, `estado`) 
VALUES ('João Silva', 'joao.silva@gmail.com', 'senha123', 25, 'Masculino', 'São Paulo', 'SP');

INSERT INTO `usuario` (`nome`, `email`, `senha`, `idade`, `genero`, `cidade`, `estado`) 
VALUES ('Maria Oliveira', 'maria.oliveira@gmail.com', 'senha456', 30, 'Feminino', 'Rio de Janeiro', 'RJ');

INSERT INTO `usuario` (`nome`, `email`, `senha`, `idade`, `genero`, `cidade`, `estado`) 
VALUES ('Carlos Santos', 'carlos.santos@gmail.com', 'senha789', 28, 'Masculino', 'Belo Horizonte', 'MG');

-- Inserindo dados na tabela Amigos
INSERT INTO `amigos` (`usuario_id`, `amigo_id`) 
VALUES (1, 2);

INSERT INTO `amigos` (`usuario_id`, `amigo_id`) 
VALUES (1, 3);

INSERT INTO `amigos` (`usuario_id`, `amigo_id`) 
VALUES (2, 3);

-- Inserindo dados na tabela Empresario
INSERT INTO `empresario` (`nome`, `email`, `senha`)
VALUES ('Lucas Almeida', 'lucas.almeida@empresa.com', 'senha111');

INSERT INTO `empresario` (`nome`, `email`, `senha`)
VALUES ('Ana Pereira', 'ana.pereira@empresa.com', 'senha222');

INSERT INTO `empresario` (`nome`, `email`, `senha`)
VALUES ('Roberto Lima', 'roberto.lima@empresa.com', 'senha333');

-- Inserindo dados na tabela Endereco
INSERT INTO `endereco` (`local`, `estado`, `bairro`, `cidade`, `numero`)
VALUES ('Avenida Paulista', 'SP', 'Centro', 'São Paulo', 1234);

INSERT INTO `endereco` (`local`, `estado`, `bairro`, `cidade`, `numero`)
VALUES ('Rua das Flores', 'RJ', 'Botafogo', 'Rio de Janeiro', 567);

INSERT INTO `endereco` (`local`, `estado`, `bairro`, `cidade`, `numero`)
VALUES ('Avenida Amazonas', 'MG', 'Savassi', 'Belo Horizonte', 890);


-- Inserindo dados na tabela Evento
INSERT INTO `evento` (`titulo`, `descricao`, `data`, `horario`, `tipo`, `telefone`, `livre`, `link`, `endereco_id`, `empresario_id`)
VALUES ('Workshop de Tecnologia', 'Evento sobre inovações tecnológicas.', '2024-10-15', '14:00:00', 'Tecnologia', '1111-2222', TRUE, 'www.workshoptech.com', 1, 1);

INSERT INTO `evento` (`titulo`, `descricao`, `data`, `horario`, `tipo`, `telefone`, `livre`, `link`, `endereco_id`, `empresario_id`)
VALUES ('Conferência de Marketing', 'Evento sobre estratégias de marketing.', '2024-11-20', '09:00:00', 'Marketing', '3333-4444', FALSE, 'www.conferencemarketing.com', 2, 2);

INSERT INTO `evento` (`titulo`, `descricao`, `data`, `horario`, `tipo`, `telefone`, `livre`, `link`, `endereco_id`, `empresario_id`)
VALUES ('Fórum de Empreendedorismo', 'Discussões sobre o futuro do empreendedorismo.', '2024-12-05', '10:30:00', 'Empreendedorismo', '5555-6666', FALSE, 'www.forumempreendedor.com', 3, 3);

-- Inserindo dados na tabela Foto
INSERT INTO `foto` (`foto`, `evento_id`)
VALUES ('imagem1.jpg', 1);

INSERT INTO `foto` (`foto`, `evento_id`)
VALUES ('imagem2.jpg', 2);

INSERT INTO `foto` (`foto`, `evento_id`)
VALUES ('imagem3.jpg', 3);

-- Inserindo dados na tabela Usuario_Evento
INSERT INTO `usuario_evento` (`usuario_id`, `evento_id`)
VALUES (1, 1);

INSERT INTO `usuario_evento` (`usuario_id`, `evento_id`)
VALUES (2, 2);

INSERT INTO `usuario_evento` (`usuario_id`, `evento_id`)
VALUES (3, 3);

-- Inserindo dados na tabela Interacao
INSERT INTO `interacao` (`usuario_id`, `evento_id`)
VALUES (1, 1);

INSERT INTO `interacao` (`usuario_id`, `evento_id`)
VALUES (2, 2);

INSERT INTO `interacao` (`usuario_id`, `evento_id`)
VALUES (3, 3);

-- Inserindo dados na tabela Pedido_Amizade
INSERT INTO `pedido_amizade` (`usuario_id`, `amigo_id`)
VALUES (1, 2);

INSERT INTO `pedido_amizade` (`usuario_id`, `amigo_id`)
VALUES (1, 3);

INSERT INTO `pedido_amizade` (`usuario_id`, `amigo_id`)
VALUES (2, 3);

-- Inserindo dados na tabela Notificacao
INSERT INTO `notificacao` (`titulo`, `descricao`, `linkEvento`, `data`)
VALUES ('Novo Evento Disponível', 'Workshop de Tecnologia disponível.', 'www.workshoptech.com', '2024-10-01');

INSERT INTO `notificacao` (`titulo`, `descricao`, `linkEvento`, `data`)
VALUES ('Novo Evento Disponível', 'Conferência de Marketing disponível.', 'www.conferencemarketing.com', '2024-11-01');

INSERT INTO `notificacao` (`titulo`, `descricao`, `linkEvento`, `data`)
VALUES ('Novo Evento Disponível', 'Fórum de Empreendedorismo disponível.', 'www.forumempreendedor.com', '2024-12-01');

-- Inserindo dados na tabela Notificacao_Usuario
INSERT INTO `notificacao_usuario` (`notificacao_id`, `usuario_id`)
VALUES (1, 1);

INSERT INTO `notificacao_usuario` (`notificacao_id`, `usuario_id`)
VALUES (2, 2);

INSERT INTO `notificacao_usuario` (`notificacao_id`, `usuario_id`)
VALUES (3, 3);

