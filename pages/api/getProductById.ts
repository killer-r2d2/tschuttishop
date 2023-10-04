import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const id = req.query.id as string;
            const product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            return res.status(200).json(product);
        } catch (error: any) {
            console.error('Error fetching product by ID:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}