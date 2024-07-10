import api from '@/app/api';

export const createServer = async (serverName: string, serverImage: File, profileId: string) => {
    try {
        const formData = new FormData();
        formData.append('serverName', serverName);
        formData.append('serverImage', serverImage);
        formData.append('profileId', profileId);

        const response = await api.post('servers/createServer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating server:', error);
        throw error;
    }
};

export const joinServer = async (inviteCode: string, profileId: string) => {
    try {
        const response = await api.post('/servers/joinServer', { inviteCode, profileId });
        return response.data.data;
    } catch (error) {
        console.error('Error in joinServer:', error);
        throw error;
    }
};

export const getProfilesByServerId = async (serverId: string) => {
    try {
        const response = await api.post('/profiles/getProfilesByServerId', { serverId });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const changeRoleToGuest = async(memberId: string) => {
    try {
        const response = await api.post('/members/changeRoleToGuest', { memberId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const changeRoleToModerator = async(memberId: string) => {
    try {
        const response = await api.post('/members/changeRoleToModerator', { memberId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const kickOutMember = async(memberId: string, profileId: string, serverId: string) => {
    try {
        const response = await api.post('/members/changeRoleToModerator', { memberId, profileId, serverId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}
