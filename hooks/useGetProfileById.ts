import useSWR, { mutate } from "swr";
import { Profile } from '../app/types/Profile';

const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export function useGetProfileById(id: string) {
    const url = `/api/profile?id=${id}`;
    const { data, error, isLoading } = useSWR<Profile>(url, fetcher);

    const refreshProfile = () => {
        mutate(`/api/profile?id=${id}`);
    };

    return {
        profile: data,
        isLoading,
        isError: error,
        refreshProfile,
    }
}
