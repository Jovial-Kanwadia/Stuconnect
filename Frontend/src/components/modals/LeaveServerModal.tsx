import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers, selectServers, Server } from "@/features/server/ServerSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { leaveServer } from "@/app/apiCalls";
import { fetchProfile, Profile, selectUserProfile } from "@/features/profile/ProfileSlice";
import { AppDispatch } from "@/app/store";



const LeaveServerModal = () => {
    const servers: Server[] = useSelector(selectServers);
    const profile: Profile = useSelector(selectUserProfile)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [server, setServer] = useState<Server | undefined>();
    useEffect(() => {
        const selectedServer = servers.find((server: Server) => server._id === id);
        setServer(selectedServer);
    }, [id, servers]);

    if (!server) {
        return null;
    }

    const handleLeaveServer = async () => {
        try {

            await leaveServer(profile._id, server._id)
            dispatch(fetchServers({ profileId: profile._id }))
            dispatch(fetchProfile());
            if (profile?.servers && profile.servers.length > 0) {
                navigate(`/servers/${profile.servers[0]}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='w-auto hover:text-blue-400 flex text-md px-3 items-center h-10 border-neutral-200 rounded-md mx-1 dark:border-neutral-800 border-2 dark:bg-zinc-700/50 transition'>
                    Leave Server
                    <LogOut className="w-4 h-4 m-1 rounded-sm" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-0 overflow-hidden">
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className="text-2xl mt-6 text-center font-bold">
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-xl dark:text-white text-zinc-500">
                        Are you sure you want to leave <span className="text-blue-400">{server.name}</span> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 dark:bg-gray-900 px-6 mt-6 py-4">
                    <div className="flex items-center justify-end w-full">
                        <Button variant="primary" onClick={handleLeaveServer}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LeaveServerModal;
