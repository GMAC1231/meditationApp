import AsyncStorage from "@react-native-async-storage/async-storage";

/* ==========================================
   FAVORITES
========================================== */

export const getFavorites = async () => {
  try {
    const stored = await AsyncStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error getting favorites:", error);
    return [];
  }
};

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.log("Error saving favorites:", error);
  }
};

export const toggleFavorite = async (item) => {
  try {
    let favorites = await getFavorites();

    const exists = favorites.find(f => f.id === item.id);

    if (exists) {
      favorites = favorites.filter(f => f.id !== item.id);
    } else {
      favorites.push(item);
    }

    await saveFavorites(favorites);

    return !exists; // returns new state (true/false)
  } catch (error) {
    console.log("Error toggling favorite:", error);
    return false;
  }
};


/* ==========================================
   REMINDERS
========================================== */

export const getReminders = async () => {
  try {
    const stored = await AsyncStorage.getItem("reminders");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error getting reminders:", error);
    return [];
  }
};

export const saveReminders = async (reminders) => {
  try {
    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
  } catch (error) {
    console.log("Error saving reminders:", error);
  }
};

export const toggleReminder = async (item) => {
  try {
    let reminders = await getReminders();

    const exists = reminders.find(r => r.id === item.id);

    if (exists) {
      reminders = reminders.filter(r => r.id !== item.id);
    } else {
      reminders.push(item);
    }

    await saveReminders(reminders);

    return !exists;
  } catch (error) {
    console.log("Error toggling reminder:", error);
    return false;
  }
};


/* ==========================================
   USER PROFILE
========================================== */

export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
  } catch (error) {
    console.log("Error saving profile:", error);
  }
};

export const getUserProfile = async () => {
  try {
    const stored = await AsyncStorage.getItem("userProfile");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.log("Error getting profile:", error);
    return null;
  }
};


/* ==========================================
   USER ACTIONS
========================================== */

export const saveUserAction = async (action) => {
  try {
    const stored = await AsyncStorage.getItem("userActions");
    const actions = stored ? JSON.parse(stored) : [];

    actions.push(action);

    await AsyncStorage.setItem("userActions", JSON.stringify(actions));
  } catch (error) {
    console.log("Error saving user action:", error);
  }
};

export const getUserActions = async () => {
  try {
    const stored = await AsyncStorage.getItem("userActions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error getting user actions:", error);
    return [];
  }
};
