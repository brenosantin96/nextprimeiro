import prisma from './prisma'

export default {

    getAllUsers: async (page: number) => {

        let perPage = 2;
        let offset = 0

        if (page) {
            offset = (page - 1) * perPage;
        }

        const users = await prisma.user.findMany({

            //as variaveis SKIP e TAKE ja existem por padrao em FINDMANY
            skip: offset, //pular determinados usuarios, por ex de 100 usuarios, se por skip 5 vai pular os 5 primeiros registros
            take: perPage, //take aqui é quantos itens ele vai pegar, por ex pular 5 e pega 10
            // o take vai ser fixo, toda pagina vai ter 2 resultados
            //o skip na pagina 1 por exemplo nao pode pular nada, o skip na pagina 2 deve pular por exemplo a quantidade de items da pagina 1 (2 itens)


            where: {
                active: true
            },
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        return users;

    },

    addUser: async (name: string, email: string) => {

        const newUser = await prisma.user.create({
            data: {
                name, email
            }
        })

        return newUser;
    },

    getUserFromEmail: async (email: string) => {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return user;
    },

    getUser: async (id: number) => {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    },

    updateUser: async (id: number, name?: string, active?: string) => {

        let data: {
            name?: string,
            active?: boolean;
        } = {};

        if (name) {
            data.name = name;
        }
        if (active) {
            switch (active) {
                case 'true':
                case '1':
                    data.active = true;
                    break;
                case 'false':
                case '0':
                    data.active = false;
                    break
            }
        }

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data
        });

        return updatedUser;

    },

    deleteUser: async (id: number) => {

        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })

        return deletedUser;

    }
}