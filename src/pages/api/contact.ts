// /pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Implement your backend logic here (e.g., send an email, save in database, etc.)

    // For demo purposes, let's assume the form submission is successful:
    return res.status(200).json({ message: 'Thank you for reaching out!' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
