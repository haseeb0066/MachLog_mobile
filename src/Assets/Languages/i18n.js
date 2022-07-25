import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import Fin from "./Fin.json";
import Swe from "./Swe.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageIs = AsyncStorage.getItem("LanguageType");

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    Fin: Fin,
    Swe: Swe,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

const changeLanguage = (val) => {
  i18n
    .changeLanguage(val)
    .then(async () => {
      setLanguage(val);

      // console.log("AsyncStorage LanguageType ==>   ", LanguageIs);
    })
    .catch((err) => console.log(err));
};

const getTranslatedText = (text) => {
  return t(text);
};

export default {
  i18n,
  changeLanguage,
};
