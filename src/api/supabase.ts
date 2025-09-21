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
  timeout: 10_000, // 10 seconds
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

export type ProfileType = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  steps: number;
};

export async function getUsers({ limit = 100 }): Promise<UserType[]> {
  const response = await instance.get('rest/v1/User', {
    params: {
      select: '*',
      limit: limit,
    },
  });

  return response.data;
}

export async function getLeaderBoard({ limit = 100 }): Promise<ProfileType[]> {
  const response = await instance.get('rest/v1/profiles', {
    params: {
      select: '*',
      limit: limit,
      order: 'steps.desc',
    },
  });

  return response.data;
}

export async function getUserByID(id: string): Promise<ProfileType> {
  const response = await instance.get('rest/v1/profiles', {
    params: {
      select: '*',
      limit: 1,
      id: 'eq.' + id,
    },
  });
  return response.data[0];
}

const api = {
  getUsers,
  getLeaderBoard,
  getUserByID,
};

export default api;
