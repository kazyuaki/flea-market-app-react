import axios from 'axios';
import type { Address } from '../types/address';


export const updateAddress = async (data: Address) => {
    const res = await axios.post('/api/purchase/address', data)
    return res.data
}