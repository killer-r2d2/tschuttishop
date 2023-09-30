import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const product = await prisma.product.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(200).json(product);
    } catch (error: any) {
      console.error('Backend Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}
