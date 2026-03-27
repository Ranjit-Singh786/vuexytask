import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  async onRequest({ request, options }) {
    const accessToken = useCookie('accessToken').value
    
    // Don't add Authorization header for login and register
    if (!accessToken || request.includes('/auth/login') || request.includes('/auth/register'))
      return

    options.headers.append('Authorization', `Bearer ${accessToken}`)
  },
})
