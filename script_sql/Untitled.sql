#mostra todos os databases presentes no banco de dados:
#show databases;

#
#drop database dbcontatos20222;

#Cria um database:
create database db_lion_school;

show databases;

# ativa utilização do database
use db_lion_school;

show tables;

create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar (80) not null,
    foto varchar(100) not null,
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
);

create table tbl_curso(
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(45) not null,
    icone varchar (100),
    carga_horaria int not null,
    sigla varchar(5),
    unique index(id)
);

create table tbl_aluno_curso(
	id int UNSIGNED not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
    matricula varchar(15) not null,
    status_aluno varchar(20) not null,
    
    foreign key (id_aluno)
		references tbl_aluno(id),
        
	foreign key (id_curso)
		references tbl_curso(id),
        
	unique index(id)
);



insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values ('José da Silva', 
			'https://br.web.img2.acsta.net/r_1920_1080/pictures/21/06/26/20/36/2157087.jpg', 
            'M', 
            '34.856.924-2', 
            '478.821.905-32', 
            'josedasilvaaragao@gmail.com', 
            '011 4774-8922', 
            '011 99574-4321', 
            '1982-12-07'
            );
            
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values ('Maria da Silva', 
			'https://s02.video.glbimg.com/x216/7890949.jpg', 
            'F', 
            '82.628.031-1', 
            '368.108.231-54', 
            'mariadasilva@gmail.com', 
            '011 4773-8273', 
            '011 94512-4341', 
            '1989-08-12'
            );
            
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values ('Lidia Galdino', 
			'https://s02.video.glbimg.com/x216/7890949.jpg', 
            'F', 
            '57.699.501-0', 
            '471.891.688-77', 
            'lidiagaldino@gmail.com', 
            '011 4773-1283', 
            '011 95186-9683', 
            '2006-04-21'
            );
            
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values ('Isabelle Victória', 
			'https://s02.video.glbimg.com/x216/7890949.jpg', 
            'F', 
            '57.699.501-0', 
            '471.891.688-77', 
            'isabellevictoria@gmail.com', 
            '011 4773-1283', 
            '011 95112-1872', 
            '2005-04-21'
            );
		
update tbl_aluno set rg = '35.567.23-4', nome = 'José da Silva Mourão' where id = 1;

delete from tbl_aluno where id=1;

select * from tbl_aluno;