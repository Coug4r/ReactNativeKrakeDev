import React, {createContext, useState, useContext, useEffect, ReactNode, Children} from "react";
import { Alert } from "react-native";
import { api } from "../config/api";

export type Contact = {
    id: number,
    nombre: string,
    celulat: string,
    fotoBase64?: string,
    latitud?: number,
    longitud?: number
}

type ContactContextType = {
    contacts: Contact[],
    fetchContacts: ()=>void,
    addContact: (contact: Omit<Contact, 'id'|'createAt'>)=> Promise<boolean>,
    updateContact: (id:number, contact: Omit<Contact, 'id'|'createAt'>)=> Promise<boolean>,
    deleteContact: (id:number)=>void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({children} : {children:ReactNode}){
    const [contacts, setContacts] = useState<Contact[]>([])

    const fetchContacts = async ()=>{
        try {
            const response = await api.get('/contactos')
            setContacts(response.data)
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar al servidor local');
        }
    }

    useEffect(()=>{
        fetchContacts();
    },[])

    const addContact = async (newContact: Omit<Contact, 'id'|'createdAt'>)=>{
        try {
            const response = await api.post('/contactos', newContact)
            setContacts([...contacts, response.data])
            return true;
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el contacto!');
            return false
        }
    }

    const updateContact = async (id:number, updateContact: Omit<Contact, 'id'|'createdAt'>)=>{
        try {
            const response = await api.put(`/contactos/${id}`, updateContact);
            setContacts(contacts.map(c => c.id == id ? response.data : c))
            return true;
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar')
            return false
        }
    }

    const deleteContact = async (id: number) => {
        try {
            await api.delete(`/contactos/${id}`)
            setContacts(contacts.filter(c => c.id !== id))
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el contacto');
        }
    }

    return(
        <ContactContext.Provider value={{contacts, fetchContacts, addContact, updateContact, deleteContact }}>
            {children}
        </ContactContext.Provider>
    )
}

    export function useContacts(){
        const context = useContext(ContactContext)
        if(!context) throw new Error('Debe usasrse dentro de un contact provider')
        return context;
    }