USE bnsdrzvcekyibxkjxydb;

CREATE TABLE  aviones (
  numero_avion int(11) NOT NULL PRIMARY KEY,
  fabricante varchar(200) NOT NULL,
  modelo varchar(200) NOT NULL,
  velocidad_max int(11) NOT NULL,
  createdat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  eliminado int(1) NOT NULL DEFAULT 0
);
  
CREATE TABLE empleados_auth (
    email varchar(200) NOT NULL PRIMARY KEY,
    password varchar(200) NOT NULL,
    createdat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auths (
    id INTEGER(11) NOT NULL PRIMARY KEY,
    email varchar(200) NOT NULL,
    password varchar(200) NOT NULL,
    createdat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE table vuelos (
	numeroVuelo int NOT null,
	PRIMARY KEY (numeroVuelo),
    numero_avion int,
    FOREIGN KEY (numero_avion) references aviones(numero_avion),
	Destino varchar (256) NOT NULL,
    Origen varchar (256) NOT NULL
);

