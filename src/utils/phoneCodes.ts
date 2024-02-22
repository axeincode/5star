interface PhoneCodeMap {
    [key: string]: string;
  }
  
  const phoneCodes: PhoneCodeMap = {
    "pt-BR": "+55",
    "en-PH": "+0",
    "en-PE": "+0",
    "es-MX": "+52",
    "es-CL": "+0",
    "en-US": "+1",
    "es-CO": "+0",
  };
  
  export function getPhoneCodeByLocale(locale: string): string {
    return phoneCodes[locale] || "Phone code not found";
  }