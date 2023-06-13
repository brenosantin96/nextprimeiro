import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

const handler: NextApiHandler = async (req, res) => {

    //enviar como parametro a requisicao pq dentro da requisicao ta o cookie
    const session = await getSession({req});

    if (!session){
        res.json({message: 'Acesso negado'});
        return;
    }

  
        res.json({message: 'Voce esta logado, bem vindo a area protegida!', session});
        return
    


}

export default handler;