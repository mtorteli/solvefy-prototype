export const captureUtms = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  const capturedUtms: Record<string, string> = {};

  utmParams.forEach((param) => {
    const value = urlParams.get(param);
    if (value) {
      capturedUtms[param] = value;
      localStorage.setItem(param, value);
    } else {
      // Try to get from localStorage if not in URL
      const storedValue = localStorage.getItem(param);
      if (storedValue) {
        capturedUtms[param] = storedValue;
      }
    }
  });

  return capturedUtms;
};
