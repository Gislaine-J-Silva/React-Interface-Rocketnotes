import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Form, Avatar } from "./styles";
import { Input } from '../../components/Input';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatarVetor.png';

import { FiUser, FiMail, FiLock, FiArrowLeft, FiCamera } from 'react-icons/fi';

import { Button } from '../../components/Button';

export function Profile(){
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate(){
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        await updateProfile({ user, avatarFile })
    }

    function handleUpdateAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1)
    }

    return(
        <Container>
            <header>
                <button type='button' onClick={handleBack}>
                    <FiArrowLeft size={24}/>
                </button>
            </header>
            <Form>
                <Avatar>
                    <img src={avatar} alt={user.avatar}/>

                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input id="avatar" type="file" onChange={handleUpdateAvatar}/>
                    </label>
                </Avatar>

                <Input 
                    placeholder="Nome do usuário" 
                    type="text" 
                    icon={FiUser} 
                    value={name} 
                    onChange={event => setName(event.target.value)}
                />

                <Input 
                    placeholder="E-mail" 
                    type="email" 
                    icon={FiMail} 
                    value={email} 
                    onChange={event => setEmail(event.target.value)}
                />

                <Input 
                    placeholder="Senha atual" 
                    type="password" 
                    icon={FiLock}
                    onChange={event => setPasswordOld(event.target.value)}
                />

                <Input 
                    placeholder="Nova senha" 
                    type="password" 
                    icon={FiLock}
                    onChange={event => setPasswordNew(event.target.value)}
                />
                
                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>

        </Container>
    )
};