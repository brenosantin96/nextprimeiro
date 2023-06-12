import { NextApiHandler } from 'next';
import { Users } from '@/utils/users';
import prisma from '../../../libs/prisma'; //pegando o prismaClient
import api from '../../../libs/api';

//reading user Info
const handlerGet: NextApiHandler = async (req, res) => {

    const { id } = req.query;

    const user = await api.getUser(parseInt(id as string));

    if (user) {
        res.status(200).json({ status: true, user });
        return;
    }

    else {
        res.status(404).json({ error: 'Usuario nao encontrado' })
    }

}

//reading user Info
const handlerPut: NextApiHandler = async (req, res) => {

    const { id } = req.query;
    const { name, active } = req.body;

    const updatedUser = await api.updateUser(parseInt(id as string), name, active);

    if (updatedUser) {
        res.status(200).json({ status: true, user: updatedUser });
        return;
    }

    else {
        res.status(404).json({ error: 'Nao foi possivel alterar este usuario.' })
    }

}

//reading user Info
const handlerDelete: NextApiHandler = async (req, res) => {

   const { id } = req.query;

   const deletedUser = await api.deleteUser(parseInt(id as string))
    .catch(() => {
        res.status(404).json({ error: 'Nao foi possivel deletar este usuario.' })
        return;
    })

    if (deletedUser) {
        res.status(200).json({
            status: true, msg: 'Usuario deletado com sucesso'
        })
    }


}



const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'PUT':
            handlerPut(req, res);
            break;
        case 'DELETE':
            handlerDelete(req, res);
            break;
    }
}

export default handler;