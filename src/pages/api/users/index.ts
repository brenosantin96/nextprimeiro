import { NextApiHandler } from 'next';
import { Users } from '@/utils/users';
import prisma from '../../../libs/prisma'; //pegando o prismaClient
import api from '../../../libs/api';

const handlerGet: NextApiHandler = async (req, res) => {

    const { page } = req.query;
    const users = await api.getAllUsers(parseInt(page as string))

    if (users) {
        res.status(200).json({ status: true, users })
    }


}


const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body;

    const newUser = await api.addUser(name, email)
        .catch((e) => {
            res.json({ error: 'Nao criou o usuario, usuario ja existe' });
            return;
        });

    if (newUser) {
        res.status(201).json({ status: true, user: newUser });
        return;
    }


}

const handler: NextApiHandler = (req, res) => {

    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'POST':
            handlerPost(req, res);
            break
    }

}

export default handler;