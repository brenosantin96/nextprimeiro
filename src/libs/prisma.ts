
//Nesta linha, estamos importando o PrismaClient do pacote @prisma/client. 
//O PrismaClient é a classe principal do Prisma Client, que é usada para interagir com o banco de dados.
import { PrismaClient } from '@prisma/client';

/*Abaixo, essa declaração declare global é usada para estender o escopo global do TypeScript. 
Aqui, estamos declarando uma variável global chamada prisma do tipo PrismaClient ou undefined. 
Essa declaração permite o acesso global à instância do Prisma Client em todo o código. */

declare global{
    var prisma: PrismaClient | undefined;
}

/*Abaixo, estamos inicializando uma variável chamada prisma com o valor da variável global prisma, se ela existir, caso contrário, 
criamos uma nova instância do PrismaClient. 
Isso significa que se uma instância do PrismaClient já estiver sendo usada globalmente, 
ela será reutilizada; caso contrário, uma nova instância será criada. */
const prisma = global.prisma || new PrismaClient();

/* Esta condição verifica se o ambiente em que o código está sendo executado é diferente de "production". 
Se for o caso, atribuímos a instância do PrismaClient à variável global prisma. 
Isso é útil durante o desenvolvimento, pois permite o acesso fácil ao PrismaClient em várias partes do código sem a 
necessidade de importá-lo repetidamente.*/

if(process.env.NODE_ENV !== "production"){
    global.prisma = prisma;
}

export default prisma;

/* Por fim, estamos exportando a instância do PrismaClient como padrão, o que permite importá-lo em outros arquivos sem a necessidade de usar chaves de desestruturação. 
Por exemplo, em outro arquivo, você pode simplesmente importar o prisma desta forma: import prisma from './prisma';.

Em resumo, esse código cria uma instância compartilhada do PrismaClient que pode ser acessada globalmente em várias partes do código. 
Isso melhora a eficiência e a reutilização do PrismaClient, além de simplificar a importação em outros arquivos. */