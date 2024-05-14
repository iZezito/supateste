import supabase from './config.js'

class GenericService {
    recurso = '';
    constructor(recurso) {
        this.recurso = recurso;
    }

    async getAll() {
        return supabase.from(this.recurso).select('*');
    }

    async getById(id) {
        return supabase.from(this.recurso).select('*').eq('id', id);
    }

    async create(data) {
        return supabase.from(this.recurso).insert(data);
    }

    async update(id, data) {
        return supabase.from(this.recurso).update(data).eq('id', id);
    }

    async delete(id) {
        return supabase.from(this.recurso).delete().eq('id', id);
    }


}

export default GenericService;
