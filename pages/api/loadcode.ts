import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import log from '@/components/logger';

const HISTORY_SIZE = 10;

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

        // Check if local timestamps supplied
        if ((!req.query.localTimestamps) || (typeof (req.query.localTimestamps) !== 'string')) {
            return res.status(400).json({ error: 'Invalid timestamps' });
        }

        // Get local timestamps
        const localTimestamps = req.query.localTimestamps.split(',').map(Number);
        log("DEBUG3", "Received timestamps:", localTimestamps);
        
        // Get user's email from session
        const userEmail = session.user.email;
        
        // Get code snippets from code table
        // TODO: Is there a way to void the hack with localTimestamps?
        const codeResult = await sql`
        SELECT code.timestamp, code.code 
        FROM code 
        JOIN users ON code.user_id = users.id 
        WHERE users.email=${userEmail} AND code.codeeditor_string=${req.query.editorId} AND code.timestamp != ALL(${`{${localTimestamps.toString()}}`}::bigint[])
        ORDER BY code.timestamp DESC
        LIMIT ${HISTORY_SIZE}
        `;
        log("DEBUG", `Query found ${codeResult.rows.length} rows.`)

        // If no rows are returned, return empty array
        if (codeResult.rows.length === 0) {
            return res.status(200).json([]);
        }

        // If more than HISTORY_SIZE rows are returned, delete all rows beyond the last 10
        if (codeResult.rows.length >= HISTORY_SIZE) {
            sql`
            DELETE FROM code 
            WHERE code.id NOT IN (
                SELECT id FROM (
                    SELECT code.id FROM code 
                    JOIN users ON code.user_id = users.id 
                    WHERE users.email=${userEmail} AND code.codeeditor_string=${req.query.editorId} 
                    ORDER BY code.timestamp DESC
                    LIMIT ${HISTORY_SIZE}
                ) AS subquery
            )
            `;
        }
        
        // Convert rows to desired format
        const history = codeResult.rows.map(row => ({
            timestamp: Number(row.timestamp),
            code: row.code
        }));

        res.status(200).json(history);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}