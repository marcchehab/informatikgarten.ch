import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Check if editor string exists
        if ((!req.query.editorId) || (typeof (req.query.editorId) !== 'string')) {
            return res.status(400).json({ error: 'Invalid editor identifier' });
        }

        // Get user's email from session
        const userEmail = session.user.email;

        // Get code snippets from code table
        const timestamps = await sql`
        SELECT code.timestamp
        FROM code 
        JOIN users ON code.user_id = users.id 
        WHERE users.email=${userEmail} AND code.codeeditor_string=${req.query.editorId} 
        ORDER BY code.timestamp DESC
        LIMIT 1
        `;

        // If no rows are returned, return empty array
        if (timestamps.rows.length === 0) {
            return res.status(200).json([]);
        }

        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(timestamps.rows[0].timestamp);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}