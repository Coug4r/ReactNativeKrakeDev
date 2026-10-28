import * as SQLite from 'expo-sqlite'

export const initDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('diario.db')
    await db.execAsync(
        `PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXIST viajes(
            id INTEGER PRIMARY KEY AUTOINCREMENTET,
            titulo TEXT NOT NULL,
            fotoBase64 TEXT NOT NULL,
            fecha TEXT NOT NULL
        );`
    );
};
console.log("Base de datos local lista!")