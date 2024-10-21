import axios from 'axios';
import { OVERVIEW_URL } from './config';
export async function overviewService() {
  try {
    const res = await axios.get(OVERVIEW_URL, {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_MOCKAROO_API,
      },
    });

    return res.data;
  } catch (error) {
    return [];
  }
}
