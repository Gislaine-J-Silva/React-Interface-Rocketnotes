import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";

import { Header } from '../../components/Header';
import { TextArea } from '../../components/TextArea';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button'

import { api } from "../../services/api";

export function NoteCreate(){
    const navigate = useNavigate();

    //Estado da nota
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    //Estado dos Links
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    
    //Estado das Tags
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    //handle
    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }
    
    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }
    
    
    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }
    
    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }
    
    async function handleNewNote(){
        if (!title){
            return alert("Digite o titulo da nota")
        }
        
        if (newLink){
            return alert("Link não adicionado. Clique em adicionar ou deixa em branco o campo.")
        }

        if (newTag){
            return alert("Tag não adicionada. Clique em adicionar ou deixa em branco o campo.")
        }


        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso.");
        navigate("/");
    }

    return (
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h2>Criar nota</h2>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={event => setTitle(event.target.value)}
                    />

                    <TextArea 
                        placeholder="Observações"
                        onChange={event => setDescription(event.target.value)}
                    />
                    
                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link} 
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }

                        <NoteItem 
                            value={newLink} 
                            isNew 
                            placeholder="Novo link"
                            onChange={event => setNewLink(event.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag} 
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }

                            <NoteItem 
                                value={newTag} 
                                isNew 
                                placeholder="Novo marcador"
                                onChange={event => setNewTag(event.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>

                
            </main>
        </Container>
    )
};