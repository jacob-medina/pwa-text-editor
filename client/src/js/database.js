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

export const putDb = async (content) => {
  const db = await openDB('jate');
  await db.put('jate', { id: 'content', content: content });
}

export const getDb = async () => {
  const db = await openDB('jate');
  const content = await db.get('jate', 'content');
  return content ? content.content : '';
}

initdb();
