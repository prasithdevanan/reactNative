import { useUserStore } from "@/store/useStore";
import { useUser } from "@clerk/expo";
import { useSupabase } from "./useSupabase";
import { useEffect } from "react";


export const useUserSync = () => {
    const { user } = useUser();
    const setAdmin = useUserStore((state) => state.setIsAdmin);

    const authSupabase = useSupabase();

    useEffect(() => {
        if (!user) return;
        syncUser();

    }, [user]);

    const syncUser = async () => {
        const { data } = await authSupabase
            .from("Users")
            .select("clerk_id, is_admin")
            .eq("clerk_id", user!.id)
            .single();
        
            if(data) {
                setAdmin(data.is_admin ?? false);
                return;
            }

            const { data: newUser } = await authSupabase.from("Users")
            .insert({
                clerk_id: user!.id,
                email: user!.emailAddresses[0].emailAddress,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl
            })
            .select("is_admin")
            .single();

            setAdmin(newUser?.is_admin ?? false);
    }
    
}