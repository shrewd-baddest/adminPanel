import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Only add the script if it hasn’t been added yet
    if (!document.querySelector("#google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);
    }

    // Only initialize once
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!document.querySelector(".goog-te-combo")) { // Avoid duplicates
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,sw,es,de",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };
    }

    // Cleanup optional — not removing script
  }, []);

  return (
    <div className="inline-flex items-center px-3 py-2 space-x-2 bg-white border border-gray-300 rounded-md shadow-sm">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
        alt="Translate"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium text-gray-700">Language:</span>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
