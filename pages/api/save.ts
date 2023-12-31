import { getServerSession } from 'next-auth';
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const HISTORY_SIZE = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Check if data is an array with at least one item
    if (!Array.isArray(req.body.history) || req.body.history.length === 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    // If oldest in database is newer than the newest we're trying to save, don't save
    const oldestItem = await kv.zrange(session.user.email, 0, 0, {"withScores": true});
    if (oldestItem && oldestItem[1] > req.body.history[0].timestamp) {
      return res.status(200).json({ message: 'Data not saved' });
    }
    // Cut off history if it's too long
    if (req.body.history.length > HISTORY_SIZE) {
      req.body.history = req.body.history.slice(0, HISTORY_SIZE);
    }
    // Save data to database
    for (const item of req.body.history) {
      await kv.zadd(session.user.email, { score: item.timestamp, member: item.code });
    }
    // Cut off history if it's too long
    await kv.zremrangebyrank(session.user.email, 0, -(HISTORY_SIZE + 1));

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving user data' });
  }
}