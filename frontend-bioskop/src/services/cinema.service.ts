import type { CinemaModel } from "@/models/cinema.model";
import { useAxios } from "@/utils";

export class CinemaService {
    static async getCinemas() {
        return await useAxios('/cinema')
    }

    static async getCinemaById(id: number) {
        return await useAxios(`/cinema/${id}`)
    }

    static async createCinema(model: any) {
        return await useAxios('/cinema', 'post', model)
    }

    static async updateCinema(id: number, model: CinemaModel) {
        return await useAxios(`/cinema/${id}`, 'put', model)
    }

    static async deleteCinemaById(id: number) {
        return await useAxios(`/cinema/${id}`, 'delete')
    }
}