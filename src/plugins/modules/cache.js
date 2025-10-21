export default {
  set (key, value) {
    if (!localStorage) {
      return;
    }
    if (key !== null && value !== null) {
      localStorage.setItem(key, value);
    }
  },
  get (key) {
    if (!localStorage) {
      return null;
    }
    if (key === null) {
      return null;
    }
    return localStorage.getItem(key);
  },
  setJSON (key, jsonValue) {
    if (jsonValue !== null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  getJSON (key) {
    const value = this.get(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  },
  remove (key) {
    localStorage.removeItem(key);
  }
};