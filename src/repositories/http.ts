import axios from 'axios'

export const http = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
})

export function bearer(token: string): { Authorization: string } {
  return {
    Authorization: `Bearer ${token}`,
  }
}
