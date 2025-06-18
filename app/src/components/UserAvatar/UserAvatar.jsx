import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { AvatarContainer } from "./UserAvatar.style";
import { LoggedUser } from "../../apis/auth.api";

export default function UserAvatars() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await LoggedUser();
                if (user && user.user) {
                    setEmail(user.user.email);
                }
            } catch (err) {
                setEmail('');
            }
        }
        fetchUser();
    }, []);

    return (
        <AvatarContainer>
            <Avatar>{email ? email.charAt(0).toUpperCase() : 'G'}</Avatar>
        </AvatarContainer>
    );
}