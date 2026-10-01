import React, {createContext, useState, useContext, ReactNode} from "react";

export type Routine = {
    id: string
    name: string
    muscleGroup: string
    duration: number
    createdAt: string
}

type RoutineContextType = {
    routines: Routine[]
    addRoutine: (Routine: Omit<Routine, 'id' | 'createdAt'>)=>void
    updateRoutine: (id:string, Routine: Omit<Routine, 'id' | 'createdAt'>)=>void
    deleteRoutine: (id:string)=>void
}

const RoutineContext = createContext<RoutineContextType|undefined>(undefined)

export function RoutineProvider({children}:{children:ReactNode}){
    const [routines, setRoutines] = useState<Routine[]>([
        {id:"1", name:'Rutina de Pecho', muscleGroup:'Pectorales', duration: 60, createdAt: new Date().toLocaleDateString()},
        {id:"2", name:'Rutina de Triceps', muscleGroup:'Brazos ', duration: 60, createdAt: new Date().toLocaleDateString()}
    ]);

    const addRoutine = (Routine: Omit<Routine, 'id' | 'createdAt'>)=>{
        const newRoutine={
            ...Routine,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString()
        };
        setRoutines([...routines, newRoutine])
    }

    const updateRoutine =(id:string, updateRoutine: Omit<Routine, 'id'|'createdAt'>)=>{
        setRoutines(routines.map(r => r.id === id ? {...r, ...updateRoutine}: r))
    }

    const deleteRoutine = (id:string)=>{
        setRoutines(routines.filter(r=>r.id !== id))
    }

    return(
        <RoutineContext.Provider value={{routines, addRoutine, updateRoutine, deleteRoutine}}>
            {children}
        </RoutineContext.Provider>
    )
}

export function useRoutines(){
    const context = useContext(RoutineContext);
    if(!context) throw new Error('useProducts debe ser usado dentro de un ProductProvaider!');
    return context
}