export const saveToStorage = (name, data) => {
  if (typeof window === 'undefined') return;
  // is the localStorage supported by browser:
  if (!window || !window.localStorage) {
    return;
  }
  //save data to localstorage:
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const getFromStorage = (name) => {
  if (typeof window === 'undefined') return null;
  // is the localStorage supported by browser:
  if (!window || !window.localStorage) {
    return null;
  }
  //save data to localstorage:
  try {
    return JSON.parse(window.localStorage.getItem(name));
  } catch (e) {
    console.error(e); //
    return null;
  }
};
