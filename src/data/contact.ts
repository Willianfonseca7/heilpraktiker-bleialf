export const practiceContact = {
  email: "kontakt@praxis-demo.de",
  phoneDisplay: "+49 (0) 6555 123456",
  phoneHref: "+496555123456",
  addressLines: [
    "Heilpraktiker-Zentrum Bleialf",
    "Bahnhofstrasse 12",
    "54608 Bleialf",
  ],
  responseTime: "Wir melden uns in der Regel innerhalb von 24 Stunden zurueck.",
  openingHours: [
    { label: "Montag - Freitag", value: "08:30 - 18:00 Uhr" },
    { label: "Samstag", value: "Nach Vereinbarung" },
    { label: "Sonntag", value: "Geschlossen" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Bahnhofstrasse%2012%2C%2054608%20Bleialf&z=15&output=embed",
  mapsPlaceUrl:
    "https://www.google.com/maps/search/?api=1&query=Bahnhofstrasse%2012%2C%2054608%20Bleialf",
  routeDestination:
    "Heilpraktiker-Zentrum Bleialf, Bahnhofstrasse 12, 54608 Bleialf",
} as const;
