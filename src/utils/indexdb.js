const html5rocks = {};
const DB_VERSION = 2;
const DB_NAME = 'budget';

html5rocks.indexedDB = {};
html5rocks.indexedDB.db = null;

html5rocks.indexedDB.onerror = function (e) {
  console.log(e);
};

function open() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;
      let store;

      // Якщо сховище не існує - створюємо
      if (!db.objectStoreNames.contains(DB_NAME)) {
        store = db.createObjectStore(DB_NAME, { keyPath: 'id' });
      } else {
        store = e.target.transaction.objectStore(DB_NAME);
      }

      // 🔹 Гарантуємо створення `dateIndex`
      if (!store.indexNames.contains('dateIndex')) {
        store.createIndex('dateIndex', 'date', { unique: false });
      }
    };

    request.onsuccess = function (e) {
      html5rocks.indexedDB.db = e.target.result;
      resolve();
    };

    request.onerror = (e) => {
      reject(Error(e));
    };
  });
}

function addItem(item) {
  return new Promise((resolve, reject) => {
    const db = html5rocks.indexedDB.db;
    const trans = db.transaction([DB_NAME], 'readwrite');
    const store = trans.objectStore(DB_NAME);

    const itemWithStar = {
      ...item,
      isStarred: item.isStarred ?? false,
    };

    const request = store.put(itemWithStar);

    request.onsuccess = function (e) {
      resolve();
    };

    request.onerror = function (e) {
      reject(e);
    };
  });
}

function deleteItem(id) {
  return new Promise((resolve, reject) => {
    const db = html5rocks.indexedDB.db;
    const trans = db.transaction([DB_NAME], 'readwrite');
    const store = trans.objectStore(DB_NAME);

    const request = store.delete(id);

    request.onsuccess = function (e) {
      resolve();
    };

    request.onerror = function (e) {
      reject(e);
    };
  });
}

function getItems() {
  return new Promise((resolve, reject) => {
    var db = html5rocks.indexedDB.db;
    if (!db) {
      reject(Error('No db'));
    }
    var trans = db.transaction([DB_NAME], 'readwrite');
    var store = trans.objectStore(DB_NAME);

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function () {
      resolve(getAllRequest.result);
    };
  });
}

function getData(start, total) {
  return new Promise((resolve, reject) => {
    const db = html5rocks.indexedDB.db;
    const t = db.transaction([DB_NAME], 'readonly');
    const store = t.objectStore(DB_NAME);

    // Використовуємо `dateIndex` для сортування
    const index = store.index('dateIndex');
    const transactions = [];
    let hasSkipped = false;

    index.openCursor(null, 'prev').onsuccess = function (e) {
      const cursor = e.target.result;
      if (!hasSkipped && start > 0 && cursor) {
        hasSkipped = true;
        cursor.advance(start);
        return;
      }
      if (cursor) {
        transactions.push(cursor.value);
        if (transactions.length < total) {
          cursor.continue();
        } else {
          resolve(transactions);
        }
      } else {
        resolve(transactions);
      }
    };
  });
}

async function getAllData() {
  return new Promise((resolve, reject) => {
    open()
      .then(() => {
        const db = html5rocks.indexedDB.db;
        if (!db) {
          reject(Error('No database found'));
          return;
        }

        const transaction = db.transaction(['budget'], 'readonly');
        const store = transaction.objectStore('budget');

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e);
      })
      .catch(reject);
  });
}

const updateItem = (item) => addItem(item);

export { open, addItem, getItems, deleteItem, updateItem, getData, getAllData };
