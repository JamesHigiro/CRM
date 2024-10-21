import axios from 'axios';
import { DATALIST_URL } from "./config";
export async function dataListService() {
  try {
    const res = await axios.get(DATALIST_URL, {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_MOCKAROO_API,
      },
    });

    return res.data;
  } catch (error) {
    return [];
  }
}
