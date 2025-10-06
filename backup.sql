-- MySQL dump 10.13  Distrib 5.7.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: seguranca
-- ------------------------------------------------------
-- Server version	5.7.44-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acidente`
--

DROP TABLE IF EXISTS `acidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acidente` (
  `codigo` int(11) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acidente`
--

LOCK TABLES `acidente` WRITE;
/*!40000 ALTER TABLE `acidente` DISABLE KEYS */;
INSERT INTO `acidente` VALUES (200004300,'Impacto de pessoa contra objeto parado'),(200004600,'Impacto de pessoa contra objeto em movimento'),(200008300,'Impacto sofrido por pessoa de objeto que cai'),(200008600,'Impacto sofrido por pessoa de objeto projetado'),(200008900,'Impacto sofrido por pessoa, NIC'),(200012200,'Queda de pessoa com diferença de nível de andaime, passagem, plataforma, etc.'),(200012300,'Queda de pessoa com diferença de nível de escada móvel ou fixada cujos degraus'),(200012400,'Queda de pessoa com diferença de nível de material empilhado'),(200012500,'Queda de pessoa com diferença de nível de veículo'),(200012600,'Queda de pessoa com diferença de nível em escada permanente'),(200012700,'Queda de pessoa com diferença de nível em poço, escavação, abertura no piso, etc.'),(200012900,'Queda de pessoa com diferença de nível, NIC'),(200016300,'Queda de pessoa em mesmo nível em passagem ou superfície de sustentação'),(200016600,'Queda de pessoa em mesmo nível sobre ou contra alguma coisa'),(200016900,'Queda de pessoa em mesmo nível, NIC'),(200020100,'Aprisionamento em, sobre ou entre objetos em movimento convergente'),(200020300,'Aprisionamento em, sobre ou entre objeto parado e outro em movimento'),(200020500,'Aprisionamento em, sobre ou entre dois ou mais objetos em movimento'),(200020700,'Aprisionamento em, sobre ou entre desabamento ou desmoronamento'),(200020900,'Aprisionamento em, sob ou entre, NIC'),(200024300,'Atrito ou abrasão por encostar, pisar, ajoelhar ou sentar em objeto'),(200024400,'Atrito ou abrasão por manusear objeto'),(200024500,'Atrito ou abrasão por objeto em vibração'),(200024600,'Atrito ou abrasão por corpo estranho no olho'),(200024700,'Atrito ou abrasão por compressão repetitiva'),(200024900,'Atrito ou abrasão, NIC'),(200028300,'Reação do corpo a movimento involuntário'),(200028600,'Reação do corpo a movimento voluntário'),(200032200,'Esforço excessivo ao erguer objeto'),(200032400,'Esforço excessivo ao empurrar ou puxar objeto'),(200032600,'Esforço excessivo ao manejar, sacudir ou arremessar objeto'),(200032900,'Esforço excessivo, NIC'),(200036000,'Elétrica, exposição a energia'),(200040300,'Temperatura muito alta, contato com objeto ou substância a'),(200040600,'Temperatura muito baixa, contato com objeto ou substância a'),(200044300,'Temperatura ambiente elevada, exposição a'),(200044600,'Temperatura ambiente baixa, exposição a'),(200048200,'Inalação de substância cáustica, tóxica ou nociva'),(200048400,'Ingestão de substância cáustica'),(200048600,'Absorção de substância cáustica'),(200048900,'Inalação, ingestão ou absorção, NIC'),(200052000,'Imersão'),(200056000,'Radiação não ionizante, exposição a'),(200060000,'Radiação ionizante, exposição a'),(200064000,'Ruído, exposição a'),(200068000,'Vibração, exposição a'),(200072000,'Pressão ambiente, exposição a'),(200072300,'Exposição à pressão ambiente elevada'),(200072600,'Exposição à pressão ambiente baixa'),(200076200,'Poluição da água, ação da (exposição à poluição da água)'),(200076400,'Poluição do ar, ação da (exposição à poluição do ar)'),(200076600,'Poluição do solo, ação da (exposição à poluição do solo)'),(200076900,'Poluição, NIC, exposição a (exposição à poluição, NIC)'),(200080200,'Ataque de ser vivo por mordedura, picada, chifrada, coice, etc.'),(200080400,'Ataque de ser vivo com peçonha'),(200080600,'Ataque de ser vivo com transmissão de doença'),(200080900,'Ataque de ser vivo, NIC'),(209000000,'Tipo, NIC'),(209500000,'Tipo inexistente');
/*!40000 ALTER TABLE `acidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agente`
--

DROP TABLE IF EXISTS `agente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agente` (
  `codigo` int(11) DEFAULT NULL,
  `descricao` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agente`
--

LOCK TABLES `agente` WRITE;
/*!40000 ALTER TABLE `agente` DISABLE KEYS */;
INSERT INTO `agente` VALUES (302010200,'Rua e estrada - superfície utilizada para sustentar pessoas'),(302010250,'Calçada ou caminho para pedestre'),(302010300,'Piso de edifício'),(302010350,'Escada permanente cujos degraus permitem apoio integral do pé, degrau'),(302010400,'Rampa'),(302010450,'Passarela ou plataforma permanentes'),(302010500,'Piso de mina'),(302010550,'Chão'),(302010600,'Piso de andaime e plataforma desmontável'),(302010650,'Piso de veiculo'),(302010700,'Telhado'),(302010900,'Superfície de sustentação, NIC'),(302030900,'Escada móvel ou fixada'),(302050100,'Edifício - edifício ou estrutura'),(302050200,'Depósito fixo (tanque, silo, paiol, etc.) - edifício ou estrutura'),(302050300,'Cais, doca - edifício ou estrutura'),(302050400,'Dique, barragem – edifício ou estrutura'),(302050500,'Ponte, viaduto - edifício ou estrutura'),(302050600,'Arquibancada, estádio - edifício ou estrutura'),(302050700,'Andaime, plataforma - edifício ou estrutura'),(302050800,'Torre, poste - edifício ou estrutura'),(302050900,'Edifício ou estrutura (exceto piso, superfície de sustentação ou área de circulação)'),(302070100,'Escavação (para edifício, estrada, etc.)'),(302070300,'Canal, fosso'),(302070500,'Poço, entrada, galeria, etc., de mina'),(302070700,'Túnel'),(302070900,'Escavação, fosso, túnel, NIC'),(302090000,'Superfície e estrutura, NIC'),(303010040,'Martelo, malho, marreta - ferramenta manual sem força motriz'),(303010080,'Machadinha, enxó - ferramenta manual sem força motriz'),(303010120,'Faca, facão - ferramenta manual sem força motriz'),(303010160,'Tesoura, tesourão - ferramenta manual sem força motriz'),(303010200,'Formão, cinzel - ferramenta manual sem força motriz'),(303010240,'Serra, serrote - ferramenta manual sem força motriz'),(303010280,'Alicate, torques, tenaz - ferramenta manual sem força motriz'),(303010320,'Plaina - ferramenta manual sem força motriz'),(303010360,'Lima, grosa - ferramenta manual sem força motriz'),(303010400,'Punção, ponteiro, vazador, talhadeira - ferramenta manual sem força motriz'),(303010440,'Pua, trado, verruma, máquina de furar manual - ferramenta manual sem força motriz'),(303010480,'Chave de parafuso - ferramenta manual sem força motriz'),(303010520,'chave de porca ou de abertura regulável, chave de boca'),(303010560,'Alavanca, pé-de-cabra - ferramenta manual sem força motriz'),(303010600,'Corda, cabo, corrente - ferramenta manual sem força motriz'),(303010640,'Machado - ferramenta manual sem força motriz'),(303010680,'Enxada, enxadão, sacho - ferramenta manual sem força motriz'),(303010720,'Pá, cavadeira - ferramenta manual sem força motriz'),(303010760,'Picareta - ferramenta manual sem força motriz'),(303010800,'Garfo, ancinho, forcado - ferramenta manual sem força motriz'),(303010900,'Ferramenta manual sem força motriz, NIC'),(303015050,'Martelete, socador - ferramenta portátil com força motriz ou aquecimento'),(303015100,'Talhadeira - ferramenta portátil com força motriz ou aquecimento'),(303015150,'Cortadeira, guilhotina - ferramenta portátil com força motriz ou aquecimento'),(303015200,'Serra - ferramenta portátil com força motriz ou aquecimento'),(303015250,'Punção, ponteiro, vazador - ferramenta portátil com força motriz ou aquecimento'),(303015300,'Perfuratriz - ferramenta portátil com força motriz ou aquecimento'),(303015350,'Rebitadeira - ferramenta portátil com força motriz ou aquecimento'),(303015400,'Máquina de aparafusar - ferramenta portátil com força motriz ou aquecimento'),(303015450,'Esmeril - ferramenta portátil com força motriz ou aquecimento'),(303015500,'Politriz, enceradeira - ferramenta portátil com força motriz ou aquecimento'),(303015550,'Ferro de passar - ferramenta portátil com força motriz ou aquecimento'),(303015600,'Ferramenta de soldagem - ferramenta portátil com força motriz ou aquecimento'),(303015650,'Maçarico - ferramenta portátil com força motriz ou aquecimento'),(303015700,'Ferramenta acionada por explosivo - ferramenta portátil com força motriz ou aquecimento'),(303015750,'Jato de areia - ferramenta portátil com força motriz ou aquecimento'),(303015900,'Ferramenta portátil com forca motriz ou aquecimento, NIC'),(303020040,'Serra - máquina'),(303020080,'Tesoura, guilhotina, máquina de cortar - máquina'),(303020120,'Laminadora, calandra - máquina'),(303020160,'Furadeira, broqueadeira, torno, freza - máquina'),(303020200,'Prensa - máquina'),(303020240,'Plaina, tupia - máquina'),(303020280,'Máquina de fundir, de forjar, de soldar'),(303020320,'Britador, moinho - máquina'),(303020360,'Misturador, batedeira, agitador - máquina'),(303020400,'Peneira mecânica, máquina separadora - máquina'),(303020440,'Politriz, lixadora, esmeril - máquina'),(303020480,'Máquina de terraplenagem e construção de estrada'),(303020520,'Máquina de mineração e perfuração (de túnel, poço, etc.)'),(303020560,'Máquina agrícola'),(303020600,'Máquina têxtil'),(303020640,'Máquina de costurar e de pespontar'),(303020680,'Máquina de imprimir'),(303020720,'Máquina de escritório'),(303020760,'Máquina de embalar ou empacotar'),(303020900,'Máquina, NIC'),(303025300,'Transportador por gravidade'),(303025600,'Transportador com força motriz'),(303025900,'Transportador, NIC'),(303030050,'Guindaste - equipamento de guindar'),(303030100,'Ponte rolante - equipamento de guindar'),(303030150,'Elevador - equipamento de guindar'),(303030200,'Elevador de caçamba para mineração - equipamento de guindar'),(303030250,'Pá mecânica, draga - equipamento de guindar'),(303030300,'Talha - equipamento de guindar'),(303030350,'Pau de carga - equipamento de guindar'),(303030400,'Macaco (mecânico, hidráulico, pneumático) - equipamento de guindar'),(303030450,'Guincho pneumático - equipamento de guindar'),(303030500,'Guincho elétrico - equipamento de guindar'),(303030900,'Equipamento de guindar, NIC'),(303035300,'Correia - dispositivo de transmissão de energia mecânica'),(303035400,'Corrente, corda, cabo - dispositivo de transmissão de energia mecânica'),(303035500,'Tambor, polia, roldana - dispositivo de transmissão de energia mecânica'),(303035600,'Embreagem de fricção - dispositivo de transmissão de energia mecânica'),(303035700,'Engrenagem - dispositivo de transmissão de energia mecânica'),(303035900,'Dispositivo de transmissão de energia mecânica, NIC'),(303040100,'Gerador - equipamento elétrico'),(303040200,'Condutor - equipamento elétrico'),(303040300,'Transformador, conversor - equipamento elétrico'),(303040400,'Painel de controle, barramento, chave, interruptor, disjuntor, fusível'),(303040500,'Reostato, dispositivo de partida e aparelho de controle, capacitor...'),(303040600,'Motor elétrico - equipamento elétrico'),(303040700,'Equipamento magnético - equipamento elétrico'),(303040750,'Equipamento eletrolítico - equipamento elétrico'),(303040800,'Equipamento de aquecimento elétrico - equipamento elétrico'),(303040900,'Equipamento elétrico, NIC'),(303045200,'Motor (combustão interna, vapor)'),(303045400,'Bomba'),(303045600,'Turbina'),(303045900,'Motor, bomba, turbina, NIC'),(303050200,'Caldeira'),(303050400,'Vaso sob pressão (para líquido, gás ou vapor)'),(303050600,'Tubo sob pressão'),(303050900,'Caldeira, vaso sob pressão, NIC'),(303055200,'Caixão pneumático'),(303055400,'Escafandro'),(303055600,'Equipamento de mergulho'),(303055900,'Equipamento para trabalho em ambiente de pressão anormal, NIC'),(303060000,'Forno, estufa, retorta, aquecedor de ambiente, fogão, etc., '),(303065000,'Equipamento emissor de radiação não ionizante'),(303065300,'Equipamento de iluminação'),(303065600,'Arco elétrico - equipamento emissor de radiação não ionizante'),(303065900,'Equipamento emissor de radiação não ionizante, NIC'),(303066300,'Equipamento de iluminação'),(303066600,'Arco elétrico'),(303070200,'Equipamento de raios X - equipamento ou substância emissores de radiação ionizante'),(303070400,'Reator (inclui combustível e resíduo)'),(303070600,'Fonte de radioisótopo'),(303070900,'Equipamento ou substância emissores de radiação ionizante, NIC'),(303075100,'Bicicleta'),(303075150,'Triciclo'),(303075200,'Motocicleta, motoneta'),(303075250,'Veículo rodoviário motorizado'),(303075300,'Veículo sobre trilho'),(303075350,'Veículo aquático'),(303075400,'Aeronave'),(303075450,'Empilhadeira'),(303075500,'Rebocador mecânico, mula mecânica'),(303075550,'Carro-de-mão'),(303075600,'Trator'),(303075650,'Veículo de terraplenagem'),(303075700,'Veículo de tração animal'),(303075750,'Veículo deslizante'),(303075800,'Veículo funicular (tração por cabo)'),(303075900,'Veículo, NIC'),(303090000,'Ferramenta, máquina, equipamento, veículo, NIC'),(305004100,'Composto metálico (de chumbo, mercúrio, zinco, cadmio, cromo, etc.)'),(305004150,'Composto de arsênio'),(305004200,'Gás carbônico (dióxido de carbono, CO2)'),(305004250,'Monóxido de carbono (CO)'),(305004300,'Óxidos de Nitrogênio (vapores nitrosos)'),(305004350,'Ácido'),(305004400,'Álcali'),(305004450,'Composto de fósforo'),(305004500,'Dissulfeto de carbono'),(305004550,'Cianeto ou composto de cianogênio'),(305004600,'Álcool'),(305004650,'Tetracloreto de carbono'),(305004700,'Composto orgânico halogenado (tricloretileno, percloretileno, cloreto de metilo, substâncias refrigerantes)'),(305004750,'Composto aromático (benzol, toluol, xilol, anilina, etc.)'),(305004900,'Substância química, NIC'),(305008500,'Água - usar quando o estado líquido contribuir preponderantemente para a ocorrência'),(305008900,'Líquido, NIC'),(305020000,'Partículas - não identificadas'),(305024100,'Pele, crina, pelo, lã (em bruto) - produto animal'),(305024300,'Pena - produto animal'),(305024500,'Couro cru ou curtido - produto animal'),(305024700,'Osso - produto animal'),(305024900,'Produto animal, NIC'),(305028000,'Madeira (toro, madeira serrada, pranchão, poste, barrote, ripa e produto de madeira)'),(305032000,'Produto mineral metálico'),(305032500,'Metal'),(305036000,'Produto mineral não metálico'),(305040100,'Petróleo bruto, bruto reduzido'),(305040150,'Asfalto, alcatrão, piche'),(305040200,'Óleo combustível'),(305040250,'Parafina, óleo lubrificante e de corte, graxas'),(305040300,'Gasóleo, óleo diesel'),(305040350,'Querosene'),(305040400,'Nafta e solvente de nafta'),(305040450,'Gasolina'),(305040500,'Hidrocarboneto gasoso'),(305040600,'Carvão'),(305040650,'Coque'),(305040700,'Gás encanado de carvão'),(305040900,'Produto de petróleo e de carvão, NIC'),(305044000,'Vidraria, fibra de vidro, lâmina, etc., exceto frasco, garrafa'),(305048000,'Cerâmica'),(305048300,'Tijolo e telha - cerâmica'),(305048400,'Louça de mesa e outros utensílios'),(305048500,'Tubo, manilha - cerâmica'),(305048600,'Revestimento cerâmico (azulejo, mosaico, etc.) - cerâmica'),(305048700,'Louca sanitária (pia, vaso sanitário, etc.) - cerâmica'),(305048900,'Cerâmica, NIC'),(305052000,'Têxteis - inclui fibras animais após o primeiro desengorduramento e limpeza...'),(305056000,'Plástico - inclui pó, folha, trefilado, barra, perfil, etc.'),(305060000,'Papel e pasta para papel'),(305064000,'Produtos alimentícios inclui carne leite e derivados legumes frutas cerais e derivados'),(305064300,'Carne e derivados - inclusive de origem animal'),(305064400,'Leite e derivados - inclusive de origem animal'),(305064500,'Legume, verdura e derivados'),(305064600,'Fruta e derivados'),(305064700,'Cereal e derivados'),(305064900,'Produto alimentício - inclusive de origem animal, NIC'),(305068300,'Medicamento em geral (exceto produto biológico)'),(305068600,'Produto biológico (soro, toxina, antitoxina, vacina, plasma) - medicamento'),(305072000,'Produto de limpeza, sabão, detergente'),(305076000,'Sucata, entulho, resíduo'),(305090000,'Substância química, material, produto, NIC'),(306020000,'Animal vivo'),(306040000,'Vegetal - planta, árvore, em estado natural, não beneficiada '),(306060000,'Agente infeccioso ou parasitário'),(306090000,'Ser vivo, NIC'),(307030100,'Cadeira banco - mobiliário e acessórios'),(307030200,'Mesa, carteira, exceto mesa elástica desmontável'),(307030250,'Mesa elástica desmontável - mobiliário e acessórios'),(307030300,'Balcão, bancada - mobiliário e acessórios'),(307030400,'Arquivo, fichário, estante - mobiliário e acessórios'),(307030500,'Tapete, forração de piso, capacho - mobiliário e acessórios'),(307030600,'Luminária, globo, lâmpada - mobiliário e acessórios'),(307030900,'Mobiliário e acessórios, NIC'),(307040100,'Caixa, engradado, caixote - embalagem, recipiente, vazio ou cheio'),(307040300,'Frasco, garrafa - embalagem, recipiente, vazio ou cheio'),(307040500,'Barril, barrica, barrilete, tambor - embalagem, recipiente, vazio ou cheio'),(307040700,'Tanque, cilindro (transportáveis e não sob pressão)'),(307040900,'Embalagem e recipiente, vazio ou cheio, NIC'),(307050900,'Vestuário, NIC'),(307070000,'Área ou ambiente de trabalho'),(309000000,'Agente do acidente, NIC'),(309500000,'Agente do acidente inexistente'),(354000000,'Energia'),(354010300,'Pressão ambiente alta trabalho em caixão pneumático mergulho'),(354010600,'Pressão ambiente baixa ar rarefeito'),(354020000,'Ruído'),(354040000,'Fogo chama material incandescente ou quente fumaça'),(354050300,'Temperatura ambiente - não inclui a de objeto ou substância quente'),(355016000,'Aerodispersóides'),(355016600,'Neblina'),(355016800,'Gás e vapor');
/*!40000 ALTER TABLE `agente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cadastro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `relatorio` varchar(20) DEFAULT NULL,
  `matricula` varchar(45) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `nascimento` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `setor` varchar(45) DEFAULT NULL,
  `funcao` varchar(45) DEFAULT NULL,
  `cnpj` varchar(45) DEFAULT NULL,
  `empresa` varchar(45) DEFAULT NULL,
  `tel_empresa` varchar(45) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `tipo_cat` varchar(45) DEFAULT NULL,
  `ult_dia` varchar(45) DEFAULT NULL,
  `comun_policia` varchar(15) DEFAULT NULL,
  `houve_obito` varchar(15) DEFAULT NULL,
  `data_obito` varchar(45) DEFAULT NULL,
  `cod_doenca` varchar(45) DEFAULT NULL,
  `situacao_doenca` varchar(150) DEFAULT NULL,
  `cod_acidente` varchar(45) DEFAULT NULL,
  `situacao_acidente` varchar(150) DEFAULT NULL,
  `inicia_cat` varchar(45) DEFAULT NULL,
  `tipo_acidente` varchar(45) DEFAULT NULL,
  `data_acidente` varchar(45) DEFAULT NULL,
  `horas_trab` varchar(45) DEFAULT NULL,
  `hora_acidente` varchar(45) DEFAULT NULL,
  `cod_parte_corpo` varchar(45) DEFAULT NULL,
  `parte_corpo` varchar(150) DEFAULT NULL,
  `lateralidade` varchar(45) DEFAULT NULL,
  `local_acidente` varchar(45) DEFAULT NULL,
  `testemunha` varchar(45) DEFAULT NULL,
  `sofreu_acidente` varchar(15) DEFAULT NULL,
  `epi` varchar(15) DEFAULT NULL,
  `descricao_acidente` varchar(360) DEFAULT NULL,
  `prov_acidente` varchar(360) DEFAULT NULL,
  `cod_agente` varchar(45) DEFAULT NULL,
  `agente` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro`
--

LOCK TABLES `cadastro` WRITE;
/*!40000 ALTER TABLE `cadastro` DISABLE KEYS */;
INSERT INTO `cadastro` VALUES (24,'03/2025','17000060','ALEXANDRE FERREIRA DOS SANTOS','','','COAFI','TGE - TEC DE GESTÃO','','','','','','','','','','','','','','','','','2025-09-01','','','','','','','','','','','',NULL,NULL),(25,'04/2025','17000104','ALLAN TEIXEIRA BRANDAO','','','GABMC','TGE - TEC DE GESTÃO','','','','','','','','','','','','','','','','','2025-10-07','','','','','','','','','','','',NULL,NULL);
/*!40000 ALTER TABLE `cadastro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corpo`
--

DROP TABLE IF EXISTS `corpo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `corpo` (
  `codigo` int(11) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corpo`
--

LOCK TABLES `corpo` WRITE;
/*!40000 ALTER TABLE `corpo` DISABLE KEYS */;
INSERT INTO `corpo` VALUES (753030000,'Crânio (inclusive encéfalo)'),(753050000,'Ouvido (externo, médio, interno, audição e equilíbrio)'),(753070100,'Olho (inclusive nervo ótico e visão)'),(753070300,'Nariz (inclusive fossas nasais, seios da face e olfato)'),(753070500,'Boca (inclusive lábios, dentes, língua, garganta e paladar)'),(753070700,'Mandíbula (inclusive queixo)'),(753070800,'Face, partes múltiplas (qualquer combinação das partes acima)'),(753080000,'Cabeça, partes múltiplas (qualquer combinação das partes acima)'),(753090000,'Cabeça, NIC'),(753510000,'Braço (entre o punho a o ombro)'),(753510200,'Braço (acima do cotovelo)'),(754000000,'Pescoço'),(755010400,'Cotovelo'),(755010600,'Antebraço (entre o punho e o cotovelo)'),(755030000,'Punho'),(755050000,'Mão (exceto punho ou dedos)'),(755070000,'Dedo'),(755080000,'Membros superiores, partes múltiplas (qualquer combinação das partes acima)'),(755090000,'Membros superiores, NIC'),(756020000,'Ombro'),(756030000,'Tórax (inclusive órgãos internos)'),(756040000,'Dorso (inclusive músculos dorsais, coluna e medula espinhal)'),(756050000,'Abdome (inclusive órgãos internos)'),(756060000,'Quadris (inclusive pélvis, órgãos pélvicos e nádegas)'),(756070000,'Tronco, partes múltiplas (qualquer combinação das partes acima)'),(756090000,'Tronco, NIC'),(757010000,'Perna (entre o tornozelo e a pélvis)'),(757010200,'Coxa'),(757010400,'Joelho'),(757010600,'Perna (do tornozelo, exclusive, ao joelho, exclusive)'),(757030000,'Articulação do tornozelo'),(757050000,'Pé (exceto artelhos)'),(757070000,'Artelho'),(757080000,'Membros inferiores, partes múltiplas (qualquer combinação das partes acima)'),(757090000,'Membros inferiores, NIC'),(758000000,'Partes múltiplas. '),(758500000,'Sistemas e aparelhos.'),(758520000,'Aparelho circulatório'),(758530000,'Aparelho respiratório'),(758540000,'Sistema nervoso'),(758550000,'Aparelho digestivo'),(758560000,'Aparelho gênito-urinário'),(758570000,'Sistema musculoesquelético'),(758590000,'Sistemas e aparelhos, NIC'),(759000000,'Localização da lesão, NIC');
/*!40000 ALTER TABLE `corpo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doenca`
--

DROP TABLE IF EXISTS `doenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doenca` (
  `codigo` int(11) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doenca`
--

LOCK TABLES `doenca` WRITE;
/*!40000 ALTER TABLE `doenca` DISABLE KEYS */;
INSERT INTO `doenca` VALUES (200004300,'Impacto de pessoa contra objeto parado'),(200004600,'Impacto de pessoa contra objeto em movimento.'),(200008300,'Impacto sofrido por pessoa, de objeto que cai.'),(200008600,'Impacto sofrido por pessoa, de objeto projetado.'),(200008900,'Impacto sofrido por pessoa, NIC.'),(200012200,'Queda de pessoa com diferença de nível de andaime, passagem, plataforma, etc. '),(200012300,'Queda de pessoa com diferença de nível de escada móvel ou fixada cujos degraus não permitem o apoio integral do pé. '),(200012400,'Queda de pessoa com diferença de nível de material empilhado. '),(200012500,'Queda de pessoa com diferença de nível de veículo. '),(200012600,'Queda de pessoa com diferença de nível em escada permanente cujos degraus permitem apoio integral do pé. '),(200012700,'Queda de pessoa com diferença de nível em poço, escavação, abertura no piso, etc. (da borda da abertura). '),(200012900,'Queda de pessoa com diferença de nível, NIC.'),(200016300,'Queda de pessoa em mesmo nível em passagem ou superfície de sustentação. '),(200016600,'Queda de pessoa em mesmo nível sobre ou contra alguma coisa. '),(200016900,'Queda de pessoa em mesmo nível, NIC. '),(200020100,'Aprisionamento em, sob ou entre objetos em movimento convergente (calandra) ou de encaixe. '),(200020300,'Aprisionamento em, sob ou entre um objeto parado e outro em movimento. '),(200020500,'Aprisionamento em, sob ou entre dois ou mais objetos em movimento (sem encaixe). '),(200020700,'Aprisionamento em, sob ou entre desabamento ou desmoronamento de edificação, barreira, etc. '),(200020900,'Aprisionamento em, sob ou entre, NIC.  fonte da lesão for um objeto livremente projetado ou em queda livre.'),(200024300,'Atrito ou abrasão por encostar, pisar, ajoelhar ou sentar em objeto (não em vibração). '),(200024400,'Atrito ou abrasão por manusear objeto (não em vibração). '),(200024500,'Atrito ou abrasão por objeto em vibração. '),(200024600,'Atrito ou abrasão por corpo estranho no olho. '),(200024700,'Atrito ou abrasão por compressão repetitiva '),(200024900,'Atrito ou abrasão, NIC. A'),(200028300,'Reação do corpo a seus movimentos - movimento involuntário (escorregão sem queda, etc.). '),(200028600,'Reação do corpo a seus movimentos - movimento voluntário. '),(200032200,'Esforço excessivo ao erguer objeto. '),(200032400,'Esforço excessivo ao empurrar ou puxar objeto. '),(200032600,'Esforço excessivo ao manejar, sacudir ou arremessar objeto. '),(200032900,''),(200036000,'Exposição a energia elétrica. '),(200040300,'Contato com objeto ou substância a temperatura muito alta. Atos químicos ou a queimadura por descarga elétrica.'),(200040600,'Contato com objeto ou substância a temperatura muito baixa. '),(200044300,'Exposição à temperatura ambiente elevada. '),(200044600,'Não se aplica aos casos de lesão proveniente de exposição à radiação solar ou outras radiações. '),(200048200,'Inalação de substância cáustica, tóxica ou nociva. '),(200048400,'Ingestão de substancia cáustica, tóxica ou nociva. '),(200048600,'Absorção (por contato) de substância cáustica, tóxica ou nociva. '),(200048900,'Inalação, ingestão e absorção, NIC.'),(200052000,'Imersão. Aplica-se aos acidentes que têm por consequência o afogamento.'),(200056000,'Exposição à radiação não ionizante.'),(200060000,'Exposição à radiação ionizante.'),(200064000,'Exposição ao ruído.'),(200068000,'Exposição à vibração.'),(200072300,'Exposição à pressão ambiente elevada.'),(200072600,'Exposição à pressão ambiente baixa.'),(200076200,'Exposição à poluição da água.'),(200076400,'Exposição à poluição do ar.'),(200076600,'Exposição à poluição do solo.'),(200076900,'Exposição à poluição, NIC.'),(200080200,'Ataque de ser vivo por mordedura, picada, chifrada, coice, etc., não se aplicando no caso de haver peçonha ou transmissão de doença.'),(200080400,'Ataque de ser vivo com peçonha.'),(200080600,'Ataque de ser vivo com transmissão de doença.'),(200080900,'Ataque de ser vivo (inclusive do homem), NIC.'),(200080901,'Contato com pessoas doentes ou material infecto-contagiante - agentes biológicos.'),(209000000,'Tipo, NIC'),(209500000,'Tipo inexistente');
/*!40000 ALTER TABLE `doenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `cnpj` varchar(18) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `tel_empresa` varchar(20) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES ('42.357.483/0011-06','Superintendência de Trens Urbanos de Maceió','Rua Barão de Anadia -21 – Centro – Maceió – Alagoas','(82) 2123-1700','57020-630');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `epi`
--

DROP TABLE IF EXISTS `epi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `epi` (
  `idepi` int(11) NOT NULL AUTO_INCREMENT,
  `epi` varchar(70) DEFAULT NULL,
  `ca` varchar(45) DEFAULT NULL,
  `validade` varchar(45) DEFAULT NULL,
  `compra` varchar(45) DEFAULT NULL,
  `estoque` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idepi`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `epi`
--

LOCK TABLES `epi` WRITE;
/*!40000 ALTER TABLE `epi` DISABLE KEYS */;
INSERT INTO `epi` VALUES (11,'Luva de Pano','090989','2029-01-01','2025-09-30','108'),(13,'Bota de Borracha','02028304','2025-10-29','2025-10-03','3');
/*!40000 ALTER TABLE `epi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `epi_funcionario`
--

DROP TABLE IF EXISTS `epi_funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `epi_funcionario` (
  `idepi_funcionario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `setor` varchar(45) DEFAULT NULL,
  `funcao` varchar(45) DEFAULT NULL,
  `epi` varchar(45) DEFAULT NULL,
  `ca` varchar(45) DEFAULT NULL,
  `entrega` varchar(45) DEFAULT NULL,
  `validade` varchar(45) DEFAULT NULL,
  `matricula` varchar(45) DEFAULT NULL,
  `quantidade` varchar(45) DEFAULT NULL,
  `devolucao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idepi_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `epi_funcionario`
--

LOCK TABLES `epi_funcionario` WRITE;
/*!40000 ALTER TABLE `epi_funcionario` DISABLE KEYS */;
INSERT INTO `epi_funcionario` VALUES (64,'ADERSON JACKSON DA SILVA','COMAN','TIN - TEC INDUSTRIAL','Luva de Pano','090989','2025-10-01','2029-01-01','17000063','1','1'),(65,'ADEMAR PASSOS DE OLIVEIRA SEGUNDO','SINFEAL','ASO 4 - CONDUÇÃO VEÍC. METROFER','Bota de Borracha','02028304','2025-10-03','2025-10-29','17000040','1','1'),(66,'ADEMAR PASSOS DE OLIVEIRA SEGUNDO','SINFEAL','ASO 4 - CONDUÇÃO VEÍC. METROFER','Bota de Borracha','02028304','2025-10-04','2025-10-29','17000040','1',NULL),(67,'ADEMAR PASSOS DE OLIVEIRA SEGUNDO','SINFEAL','ASO 4 - CONDUÇÃO VEÍC. METROFER','Luva de Pano','090989','2025-10-04','2029-01-01','17000040','1',NULL);
/*!40000 ALTER TABLE `epi_funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionarios` (
  `matricula` int(20) DEFAULT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `cargo` varchar(45) DEFAULT NULL,
  `setor` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (17000040,'ADEMAR PASSOS DE OLIVEIRA SEGUNDO','ASO 4 - CONDUÇÃO VEÍC. METROFER','SINFEAL'),(17000063,'ADERSON JACKSON DA SILVA','TIN - TEC INDUSTRIAL','COMAN'),(17000201,'ADRIANA PALMEIRA SANTA MARIA GONCALVES','ASSISTENTE EXEC II','COREH'),(17000235,'ADRIANA VIEIRA DE MELO','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(25044550,'AILTON DOS SANTOS','ASO 2 - SEGUR. METROFER','GIOPE'),(17000191,'ALBERTO VASCONCELOS DOS SANTOS','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000060,'ALEXANDRE FERREIRA DOS SANTOS','TGE - TEC DE GESTÃO','COAFI'),(17000150,'ALEXIS DAVIDSON MACIEL DE BARROS','ANG - ADMINISTRADOR','COMAK'),(17000286,'ALEXSANDRA LIMA DE LIRA CORREIA DE ARAUJO','ASSISTENTE EXEC IV','COAFI'),(17000205,'ALLAN DOUGLAS SILVA FULCO','TIN - TEC INDUSTRIAL','COMAN'),(17000104,'ALLAN TEIXEIRA BRANDAO','TGE - TEC DE GESTÃO','GABMC'),(17000083,'ALOISIO DE SALES PITOMBEIRA JUNIOR','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000234,'AMELIA MOANNA CORDEIRO VILELA GOMES','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000284,'ANA CRISTINA DE MORAES SAMPAIO','ANG - COMUNICADOR SOCIAL','COMAK'),(17000069,'ANDERSON CARDOSO SILVA','ANG - CONTADOR','COAFI'),(17000204,'ANDRE MARCELINO LOUREIRO VIANA SILVA','COORD. OPERACIONAL','COPLA'),(17000012,'ANTONIO ANTUNES PEREIRA NETO','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000107,'ANTONIO ITAMAR DE SOUZA BASTOS','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000176,'ANTONIO JOSE DE OLIVEIRA ANGELO','MDT - MEDICO DO TRABALHO','COREH'),(17000249,'ANTONIO LUIZ DA SILVA FILHO','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000264,'ANTONIO MARCOS GRIGORIO DO NASCIMENTO','ASO 2 - SEGUR. METROFER','GIOPE'),(17000277,'ANTONIO TELES DOS SANTOS NETO','ANT - ENG CIVIL','COACO'),(17000054,'ARIANA BUARQUE DE ARAUJO ANDRADE','TGE - TEC DE GESTÃO','GIAFI'),(17000208,'ARTHUR ERICKY LIMA DE ASSIS','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000213,'ASSISNEZ DE AZEVEDO FARIAS','ANT - ENG CIVIL','COACO'),(1001760,'AURELIO SILVA SANTIAGO','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000198,'BARBARA ALVES NOGUEIRA DE SOUZA','ANG - ADVOGADO','COJUR'),(17000217,'BRUNO DE JESUS DO NASCIMENTO','ASSISTENTE EXEC III','COOPE'),(17000189,'BRUNO OTAVIO PATRIOTA DE LIMA','ASO 1 - MANOBRA','COOPE'),(17000172,'CAIO SAUDE DA SILVA','ANT - ENG ELETRICISTA','COMAN'),(17000248,'CARLOS ANTONIO BOMFIM ROQUE','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(4001122,'CARLOS EDUARDO DA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000200,'CARLOS FERNANDO AVILA GLASHERSTER DA ROCHA','ANT - ENG DE TRANSPORTE','COOPE'),(17000133,'CARLOS JORGE FERREIRA CAVALCANTE','SUPERINTENDENTE','STUMC'),(17000263,'CLAUDIANOR SILVA DOS SANTOS','ASO 2 - SEGUR. METROFER','GIOPE'),(17000254,'CLAUDICIO JOSE DA SILVA','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000047,'CLAUDIO HENRIQUE DA SILVA PIMENTEL','ASO 5 - CONTROLE DE MOVIMENTO','COOPE'),(17000038,'CLAUDIO NOBRE SOARES','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000183,'CRISTHIAN ENDERSON LIMA SOUZA','TIN - TEC INDUSTRIAL','COMAN'),(10018812,'DAMIAO FERNANDES DA SILVA','TSE - TEC SEGUR. DO TRABALHO','GIAFI'),(17000062,'DANIEL PEREIRA DE QUEIROZ','TIN - TEC INDUSTRIAL','COMAN'),(17000068,'DANIELLE DA SILVA MENEZES','ANG - PSICOLOGO','COREH'),(17000059,'DANUBIO DE OLIVEIRA SANTOS','ASO 1 - MANOBRA','COOPE'),(17000011,'DARCIRIO MAGALHAES DA SILVA JUNIOR','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000197,'DELCELY RODRIGUES LEMOS LUCENA','TGE - TEC DE GESTÃO/ADMINISTRA','COREH'),(17000279,'DIOGO ANDRADE DOS SANTOS','ASSISTENTE EXEC III','GIPEN'),(17000130,'DIVALDO PEREIRA MADEIRO','COORD. OPERACIONAL','COAFI'),(17000184,'EDSON ALFREDO DA SILVA','TIN - TEC INDUSTRIAL','COOPE'),(10022205,'EDSON MONTEIRO DE LIMA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000255,'EDVALDO JUSTINIANO DA SILVA','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000216,'EDVALDO XAVIER DE ARAUJO','ANG - TECNOLOGIA INFORMAÇÃO','COPLA'),(9002247,'EDWILSON FERNANDES MOREIRA DE SANTANA','TGE - TEC DE GESTÃO','COLIC'),(17000114,'ELISANGELA LIMA DE SANTANA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000055,'ELISANGELA SANTOS FLORENTINO DE ALMEIDA','TGE - TEC DE GESTÃO','COAFI'),(23035440,'ELIZIARIO DO ESPIRITO SANTO BELFORT','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000182,'ERICK SALVINO DE MELO','TIN - TEC INDUSTRIAL','COACO'),(17000220,'EVERTON MATTHAUS GOMES FERREIRA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000067,'FABIANA ARAGAO RODRIGUES','ANG - ASSISTENTE SOCIAL','COREH'),(17000168,'FABIO BESSA SETUBAL','ANT - ENG DE PRODUÇÃO','GIOPE'),(10019335,'FERNANDO SOARES AZEVEDO','TGE - TEC DE GESTÃO','COMAK'),(17000072,'FLAVIO BARBOSA DA MATTA','ANT - ENG CIVIL','COACO'),(17000219,'FLAVIO HENRIQUE MORAIS SOUTO MAIOR','ASSISTENTE EXEC III','COMAK'),(17000091,'FRED WILLAMES FERREIRA DOS SANTOS SILVA','ASO 1 - MANOBRA','COOPE'),(17000137,'GABRIEL LINS MOUSINHO FILHO','COORD. OPERACIONAL','COMAK'),(17000169,'GEORGE FLAVIO PEREIRA CHAVES ','ANT - ENG DE TELECOMUNICAÇÕES','COOPE'),(17000212,'GISELDA NAZARIO DA COSTA','ANG - ADMINISTRADOR','COREH'),(17000207,'GLAUCIA MARIA DE VASCONCELOS CAVALCANTE','GER. REGIONAL II','GIPEN'),(17000046,'GLEBSON CARDOSO DE OLIVEIRA','ASO 5 - CONTROLE DE MOVIMENTO','COOPE'),(17000245,'GUILHERME SOARES CAVALCANTE','ANT - ENG AMBIENTAL','GIAFI'),(1001534,'HELENO GOMES DA SILVA','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000242,'HIGOR VIEIRA VALERIO','ASSISTENTE EXEC III','COACO'),(17000033,'HINDENBURGO CESARIO DE OLIVEIRA','ASA - ASSISTENTE DE ADMINIS','AGU - AL'),(80060547,'HUGO CESAR BORGES DA SILVA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000282,'HUGO CHAVES CAPORAL','ASSISTENTE EXEC III','COLIC'),(1001288,'INALDO ALVES DE ARAUJO','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(9002263,'ISRAEL TEIXEIRA BATISTA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000110,'JACKSON PALMEIRA MELO JUNIOR','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000105,'JAILDO DA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000257,'JAMILLE SCALA SARMENTO','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000052,'JANIO JOSE BERTULINO DOS SANTOS','ASO 5 - CONTROLE DE MOVIMENTO','COOPE'),(1001063,'JEFFERSON CALHEIROS DA ROCHA JUNIOR','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000122,'JOAO EUDES DE AMORIM GALVAO JUNIOR','TGE - TEC DE GESTÃO','COPLA'),(17000045,'JOAO EXPEDITO VIEIRA MACIEL','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000051,'JOAO LUIZ DANTAS DA SILVA','ASO 5 - CONTROLE DE MOVIMENTO','COOPE'),(17000090,'JOEL RAMOS DOS SANTOS FILHO','ASO 1 - MANOBRA','SINFEAL'),(17000229,'JOELMA CANDIDO BARBOSA DA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000238,'JONAS DANIEL LIMA DOS SANTOS','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000251,'JONAS GOMES DE AMORIM JUNIOR','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000013,'JOSE ADERICO JUNIOR','ASA - ASSISTENTE DE ADMINIS','GIAFI'),(17000222,'JOSE ALBERTO DA SILVA ROQUE','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000266,'JOSE ALEXANDRE DA SILVA','ASO 2 - SEGUR. METROFER','GIOPE'),(17000186,'JOSE ANTAO FERREIRA','ASO 1 - MANOBRA','COOPE'),(70002003,'JOSE ARISTIDES LIMA SILVA','ASO 2 - SEGUR. METROFER','GIOPE'),(17000057,'JOSE CARLOS SANTOS CORREIA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000247,'JOSE CLAUDIO DOS SANTOS','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000007,'JOSE CLOVIS DE ARAUJO','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(10022199,'JOSE DENILSON DO NASCIMENTO','TGE - TEC DE GESTÃO','COREH'),(17000265,'JOSE FABIO CASSIANO DOS SANTOS','ASO 2 - SEGUR. METROFER','GIOPE'),(17000071,'JOSE FLAVIO TENORIO CAVALCANTE','ANT - ENG DE SEGUR DO TRABALHO','GIAFI'),(1001533,'JOSE FRANCISCO DA SILVA','AUG - AUXILIAR DE GESTÃO','GIAFI'),(1001532,'JOSE LAERCIO COSTA','AUG - AUXILIAR DE GESTÃO','COMAN'),(17000185,'JOSE OLAVO PEREIRA SANTOS','ASO 1 - MANOBRA','COOPE'),(17000089,'JOSE PEDRO VIEIRA DOS SANTOS','ASO 1 - MANOBRA','COOPE'),(10019311,'JOSE RICARDO ALVES PEREIRA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000171,'JOSE WELLINGTON PEDRO DA SILVA FILHO','ANT - ENG DE TRANSPORTE','GIOPE'),(17000285,'JOSEFA CLAUDIA SOARES DE ALBUQUERQUE','ASSISTENTE EXEC II','GIAFI'),(10022203,'JOSIVALDO VENANCIO DE LISBOA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000231,'JULIANA RODRIGUES DA SILVA DUARTE','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000113,'KAYNES DA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000039,'KRESLERSON CARLSON ALVES DE GOUVEIA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COMAN'),(17000192,'KYCIA ALMEIDA GALVAO','ANT - ARQUITETO URBANISTA','COACO'),(17000210,'KYVIA TALLINE ROCHA MELO DE LIRA','ASSISTENTE EXEC II','COLIC'),(17000145,'LARYSSE CARVALHO CHAGAS DE MACEDO','COORD. OPERACIONAL','COLIC'),(80049570,'LAURENTINO LIMA DE BRITO','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000014,'LAURO DE MIRANDA REGO NETO','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000272,'LEONARDO ARAUJO DA SILVA','TIN - TEC INDUSTRIAL / ELETRONICA','COMAN'),(17000005,'LEONARDO DE LIMA SILVA','ASO 1 - MANOBRA','COOPE'),(17000173,'LEONARDO SANTOS SANTANA','ANT - ENG ELETRONICO','COMAN'),(17000236,'LEYLA CRISTINA DA SILVA MISSIAS','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000274,'LILIANA CAVALCANTE SOUTINHO DE OMENA','ANG - ECONOMISTA','GIPEN'),(17000166,'LUCAS LOUREIRO FREITAS','ANT - ENG CIVIL','COACO'),(1001808,'LUCIANO ALVES FIGUEIREDO','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000178,'LUCIENE PINHEIRO DE LIMA ','TEN - TEC ENFERM DO TRABALHO','COREH'),(17000049,'LUIZ CARLOS DE SOUZA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000252,'LUIZ CARLOS FRANCA BANDEIRA DE MELO','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000041,'LUIZ GOMES MENEZES JUNIOR','ASO 4 - CONDUÇÃO VEÍC. METROFER','COMAN'),(17000259,'LUIZA CAROLINE LAU NASCIMENTO','ASO 2 - SEGUR. METROFER','GIOPE'),(17000124,'LYDIANE DUARTE FERREIRA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(1001950,'MAC DOUVEL DA SILVA GOMES','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000119,'MACIEL CARLOS DOS SANTOS SILVA','ASO 5 - CONTROLE DE MOVIMENTO','COOPE'),(17000061,'MANOEL DIAS DOS SANTOS','ASO 1 - MANOBRA','COOPE'),(10022011,'MANOEL HERMINIO FILHO','ASA - ASSISTENTE DE ADMINIS','GIAFI'),(17000188,'MANOEL MELQUIADES PEREIRA NETO','ASO 1 - MANOBRA','COOPE'),(17000086,'MANOEL MESSIAS BARBOSA DOS SANTOS','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000077,'MARCEL CHRISTIAN SILVA ARANDA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000233,'MARCEL SANTOS MATEUS','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000180,'MARCELO ANTONIO DA SILVA','TSE - TEC SEGUR. DO TRABALHO','GIAFI'),(17000106,'MARCELO CURSINO DOS SANTOS','TGE - TEC DE GESTÃO','COAFI'),(17000187,'MARCELO HENRIQUES DE CARVALHO','ASO 1 - MANOBRA','COOPE'),(1002521,'MARCIA VALERIA DA SILVA CAVALCANTE','ANG - ASSISTENTE SOCIAL','COREH'),(17000032,'MARCIO DE OLIVEIRA ALBUQUERQUE JUNIOR','ASO 1 - MANOBRA','COOPE'),(17000034,'MARCOS ANTONIO DA SILVA','ASO 1 - MANOBRA','COOPE'),(1001796,'MARCOS ANTONIO DOS SANTOS SILVA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000224,'MARCOS AURELIO MENEZES DOS SANTOS','ANG - DESIGNER GRAFICO','COMAK'),(1000472,'MARCOS GENUINO DA SILVA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000035,'MARCOS ROBERTO FEIJO DE LIMA','ASO 1 - MANOBRA','SINFEAL'),(10019748,'MARCOS VALERIO TAVARES FERREIRA','TGE - TEC DE GESTÃO','COREH'),(17000157,'MARCUS ALVES CORREIA','ANG - CONTADOR','COAFI'),(1002342,'MARCUS ANTONIO DE OLIVEIRA LIMA','ANT - ENG MECANICO','COMAN'),(17000153,'MARIA GABRIELA COIMBRA LOU PEREIRA','ANG - ADVOGADO','COJUR'),(17000227,'MARIA LUANDA SILVA DO AMARAL','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000223,'MARIA MARCIA DA SILVA SOARES','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000225,'MARKSON ALAN ANDRADE DA SILVA','TGE - TEC DE GESTÃO/INFORMATICA','COPLA'),(17000246,'MONICA GUIMARAES SILVA','ANG - ARQUIVISTA','GIAFI'),(17000098,'MORGANA LINS DE MORAES PAES PINTO','ASO 3 - OPERAÇÃO DE ESTAÇÃO','GIOPE'),(17000243,'NEYLA DE HOLANDA CAVALCANTE LEITE','ASSISTENTE EXEC II','COOPE'),(17000097,'NEYRDE DE SOUZA MENDONCA','TGE - TEC DE GESTÃO','COMAN'),(17000221,'NICHOLLAS EMMANUEL DE MELO NUNES','ANT - ENG CIVIL','COACO'),(17000211,'NILTON DE CARVALHO JUNIOR','ANT - ENG DE SEGUR DO TRABALHO','GIAFI'),(17000141,'ORLEANES DE LIRA PAES ANGELO','GER. REGIONAL II','GIAFI'),(17000250,'PAULO FERREIRA DE OMENA FILHO','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000230,'PRISCYLLA SILVA SANTOS DE PAULA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000276,'RAFAELA MACIAS GAZZANEO','ANG - ADVOGADO','COJUR'),(17000158,'RAFAELA VILAR OLIVEIRA LIMA','ANG - PEDAGOGO','COREH'),(1001531,'RAIMUNDO NONATO COSTA','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000237,'RAMON TENORIO CAVALCANTE SILVA','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000181,'RAPHAEL SILVA NICACIO DE OLIVEIRA','TIN - TEC INDUSTRIAL','COMAN'),(17000268,'RAQUEL GOMES PEREIRA','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000092,'RICARDO VIEIRA MELO','ASO 1 - MANOBRA','COOPE'),(10022202,'ROBERTO CARLOS SOUZA DE LIMA','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000050,'ROBERTO DA SILVA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000123,'ROBSON JUSTINO DE SOUZA','TGE - TEC DE GESTÃO','COAFI'),(17000275,'RODOLFO AUGUSTO CAVALCANTE DE ARAUJO TENORIO','TIN - TEC INDUSTRIAL / REFRIGERAÇÃO','COMAN'),(17000241,'RODRIGO DE LIMA FERREIRA','ASO 2 - SEGUR. METROFER','GIOPE'),(17000240,'ROGER LIMA SOARES','f','COMAN'),(17000085,'ROMMEL GOMES LUCENA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000267,'RONALDO FRANCISCO DE BRITO','ASO 2 - SEGUR. METROFER','GIOPE'),(17000206,'ROSEMBERG MACENA DE ALMEIDA','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000287,'ROSEMILIA NOVAES AGRA SILVA MILITO','','GIOPE'),(17000079,'ROUSELAND LIMA MELO TOBIAS','TGE - TEC DE GESTÃO','GABMC'),(17000101,'SANDRA MARIA DE SOUZA CALHEIROS PIMENTEL','TGE - TEC DE GESTÃO','COREH'),(17000278,'SANDRO REGUEIRA SANTOS','ANG - COMUNICADOR SOCIAL','COMAK'),(17000100,'SIDINEI MARTINS DA SILVA','TGE - TEC DE GESTÃO','COREH'),(17000056,'STENIO GONCALVES BARROS','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000162,'TAIANE GONCALVES DE LIMA','ANT - ARQUITETO URBANISTA','COACO'),(17000256,'TASSIO EMMANUEL MONTEIRO FERREIRA','ASM 2 - OPERAÇÃO DE MAQ E EQUIP','COMAN'),(17000261,'THAINARA DOS SANTOS BERTO','ASO 2 - SEGUR. METROFER','GIOPE'),(17000196,'THATIANA PEDROSO PEREIRA MONTEIRO OITICICA','ANG - ADMINISTRADOR','GIAFI'),(17000218,'THAYANE PRISCILLA DA CONCEICAO LIMA','TIN - TEC INDUSTRIAL / EDIF E ESTRAD','COMAN'),(17000239,'THIAGO ALBERTO HOLANDA FERREIRA DA SILVA','ASM 1 - SISTEMAS E EQUIP. METROFER','COMAN'),(17000076,'THIAGO DE ASSUNCAO MOREIRA','TGE - TEC DE GESTÃO','COJUR'),(17000087,'THIAGO FERREIRA DA SILVA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000260,'TIAGO JOSE DA SILVA','ASO 2 - SEGUR. METROFER','GIOPE'),(17000154,'TOMAS SALDANHA ROCHA FIGUEIREDO','ANG - ADVOGADO','COJUR'),(9002279,'UBIRAJARA LIMA DIAS','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000084,'UEVISON MARQUES LOPES FERREIRA','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000036,'URLEY OLIVEIRA DE ANDRADE','ASO 1 - MANOBRA','COOPE'),(17000108,'VALDIR NOVAES DOS SANTOS','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000199,'VALMIR DE LIRA PAES','','COOPE'),(9002214,'VENINA NICEIA SANTOS SANTANA','TGE - TEC DE GESTÃO','GIPEN'),(17000244,'VICTOR MARIO SILVA DOS SANTOS','TSE - TEC SEGUR. DO TRABALHO','GIAFI'),(17000228,'VITOR GOMES BRANDAO','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000174,'WAGNER CORREIA PEIXOTO','ANT - ENG MECANICO','COMAN'),(17000226,'WAGNER DE SOUZA LIMA JUNIOR','ASO 3 - OPERAÇÃO DE ESTAÇÃO','COOPE'),(17000043,'WALBERGSON DOUGLAS SILVA GOMES','ASO 4 - CONDUÇÃO VEÍC. METROFER','COOPE'),(17000202,'WANESSA CORREIA PEIXOTO','ANG - ECONOMISTA','GIPEN'),(17000273,'WESLEY LINO ALBUQUERQUE DA SILVA','ANG - TECNOLOGIA INFORMAÇÃO','COPLA'),(3008228,'WESSLEN MARCUS BEDONI','ASO 2 - SEGUR. METROFER','GIOPE');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `senha` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (41,'Marcelo Antonio da Silva','mantonio','mantonio@cbtu.gov.br','448201'),(42,'Nilton Carvalho','ncarvalho','ncarvalho@cbtu.gov.br','123456'),(44,'Victor Mario dos Santos','vmsantos','vmsantos@cbtu.gov.br','123456');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04  8:51:07
