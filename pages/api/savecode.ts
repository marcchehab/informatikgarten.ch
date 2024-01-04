import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import log from '@/components/logger';

const REMOTE_HISTORY_SIZE = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if data is an array with at least one item
    if (!Array.isArray(req.body.history) || req.body.history.length === 0) {
      return res.status(400).json({ error: 'Invalid history' });
    }

    // Check if editor string exists
    if ((!req.body.editorId) || (typeof (req.body.editorId) !== 'string')) {
      return res.status(400).json({ error: 'Invalid editor identifier' });
    }

    // Get editor string from request
    const editorString = req.body.editorId;

    // Get user's id from users table
    let userResult = await sql`SELECT id FROM users WHERE email=${session.user.email}`;

    // If user doesn't exist, create a new user
    if (userResult.rows.length === 0) {
      userResult = await sql`
          INSERT INTO users (email, is_teacher) 
          VALUES (${session.user.email}, false)
          RETURNING id
      `;
      log("DEBUG", "New user created:", userResult.rows[0].id);
    }

    // Get user's id
    const userId = userResult.rows[0].id;

    // Save data to database
    for (const item of req.body.history.slice(0, REMOTE_HISTORY_SIZE)) {
      await sql`INSERT INTO code (user_id, timestamp, codeeditor_string, code) VALUES (${userId}, ${item.timestamp}, ${editorString}, ${item.code})`;
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving user data' });
  } 
}