
import axios, { type AxiosRequestConfig } from "axios";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./auth";

export async function useAxios(url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data: any = {}, retry = true) {
    // return await axios.request({
    //     baseURL: 'http://localhost:3000/api',
    //     url: url,
    //     method: method,
    //     headers: {
    //         'Accept': 'application/json'
    //     },
    //     data: data,
    //     validateStatus: (status: number) => {
    //         return true
    //     }
    // })

    try {
        const accessToken = getAccessToken()

        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:3000/api',
            url: url,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': accessToken ? `Bearer ${accessToken}` : ''
            },
            data,
            validateStatus: () => true
        }

        const response = await axios.request(config)

        // Handle 403 or token expiry (you can customize based on backend error message)
        if (response.status === 403 && retry) {
            const newAccess = await refreshAccessToken()
            if (newAccess) {
                return useAxios(url, method, data, false) // retry once
            }
        }

        // Handle other status codes - OK and NO_CONTENT
        if (response.status === 200 || response.status === 204) {
            return response
        }

        throw new Error("Status code: " + response.status)

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message)
        } else {
            console.error('Unknown error:', error)
        }
        throw error
    }
}

export async function login(email: string, password: string) {
    const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password
    })

    setTokens(response.data)
    return response.data
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

async function refreshAccessToken() {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return null

    try {
        const rsp = await axios.request({
            url: 'http://localhost:3000/api/user/refresh',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        })

        setTokens(rsp.data)
        return rsp.data.access

    } catch (error) {
        clearTokens()
        console.error('Token refresh failed')
        return null
    }
}
