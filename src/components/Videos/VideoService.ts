import axios from 'axios'
import { Video } from './Video'
const api= 'http://127.0.0.1:2500';

export const getVideos =  async() => {
    return await axios.get<Video[]>(`${api}/videos`)
    
}
export const getVideo =  async(id: string) => {
    return await axios.get<Video>(`${api}/videos/${id}`)
    
}
export const createVideo =  async(video: Video) => {
    return await axios.post(`${api}/videos`, video)
}
export const updateVideo =  async(id: string, video: Video) => {
    return await axios.put(`${api}/videos/${id}`, video)
}
export const deleteVideo =  async(id: string) => {
    return await axios.delete<Video>(`${api}/videos/${id}`)
    
}