import axios from 'axios';

import { API_KEY, API_URL } from '@env';

// Test Database with mock data
const SUPABASE_URL = API_URL || 'https://ztupfrscduaftouarwmb.supabase.co/';

// The publishable key can be safely shared publicly
const SUPABASE_ANON_KEY =
  API_KEY || 'sb_publishable_qv38KOQLLqSoHQZH-mR-_Q_VIJ7ESlx';

const instance = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
  },
});

export type UserType = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: boolean;
  avatar: string;
  kilometers: number;
};

export async function getUsers({ limit = 100 }): Promise<UserType[]> {
  const responsse = await instance.get('rest/v1/User', {
    params: {
      select: '*',
      limit: limit,
    },
  });

  return responsse.data;
}

export async function getLeaderBoard({ limit = 100 }): Promise<UserType[]> {
  const responsse = await instance.get('rest/v1/User', {
    params: {
      select: '*',
      limit: limit,
      order: 'kilometers.desc',
    },
  });

  return responsse.data;
}

export async function getUserByID(id: number): Promise<UserType> {
  const responsse = await instance.get('rest/v1/User', {
    params: {
      select: '*',
      limit: 1,
      id: 'eq.' + id,
    },
  });
  console.log(responsse);
  return responsse.data[0];
}

const api = {
  getUsers,
  getLeaderBoard,
  getUserByID,
};

export default api;
