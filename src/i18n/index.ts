import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json";

const resources = {
	en: {
		translation: en,
	},
	pt: {
		translation: pt,
	},
	es: {
		translation: es,
	},
	de: {
		translation: de,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "pt",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
