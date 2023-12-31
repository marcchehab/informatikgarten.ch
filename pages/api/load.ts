import { getServerSession } from 'next-auth';
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'

const HISTORY_SIZE = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get all items, newest first
    let historyArray = await kv.zrange(session.user.email, 0, -1, {"withScores": true});
    
    let history = [];
    for (let i = 0; i < historyArray.length; i += 2) {
      let code = historyArray[i];
      let timestamp = historyArray[i + 1];
      history.push({ timestamp, code });
    }
    
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
}