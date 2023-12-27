import { kv } from '@vercel/kv';
 
export async function exampleCommands() {
  try {
    const userId = await kv.hgetall('user:me');
    console.log(userId);
  } catch (error) {
    console.log(error);
  }
}