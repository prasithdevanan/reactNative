import { useUserStore } from "@/store/useStore";
import { useUser } from "@clerk/expo";
import { useSupabase } from "./useSupabase";

export const useUserSync = () => {
    const { user } = useUser();
    const setAdmin = useUserStore((state) => state.setIsAdmin);

    const authSupabase = useSupabase();
};