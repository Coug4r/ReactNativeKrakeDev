import * as SQLite from 'expo-sqlite'

export const initDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('diario.db')
    await db.execAsync(
        `PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXIST registros(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            calificacion INTEGER NOT NULL,
            comentarios TEXT NOT NULL,
            fotoBase64 TEXT NOT NULL,
            fecha TEXT NOT NULL
        );`
    );
};
console.log("Base de datos local lista!")