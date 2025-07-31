import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('diettracker.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meals (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          calories INTEGER NOT NULL,
          date TEXT NOT NULL
        );`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const insertMeal = (title, calories, date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO meals (title, calories, date) VALUES (?, ?, ?);',
        [title, calories, date],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const fetchMeals = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM meals;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
