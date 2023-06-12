// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


// type data 
type Data = {
  name: string,
  age: number
}

export default function handler(
  req: NextApiRequest, //traz todas infos da requisicao 
  res: NextApiResponse<Data> //traz todas infos da resposta da requisicao
) {
  res.status(200).json({ name: 'John Doe', age: 90})
}
