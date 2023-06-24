import { openDB } from 'idb';

const initdb = async () => 
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  tx.store.add({ content }); // This will create an object { content: "your content..." }
  return tx.done;
};

// Add logic for a method that gets all the content from the database

export const getDb = async () => {
  const db = await initdb();
  const results = await db.getAll('jate');
  return results.map(result => result.content); // This will return an array of content strings
};
initdb();