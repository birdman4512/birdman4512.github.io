// Ham Dashboard - VK4DSB - Bellmere QLD

var topBarCenterText = "VK4DSB - QG62 - Bellmere QLD";

var layout_cols = 4;
var layout_rows = 4;

// Menu items: [color, label, URL, scale, side]
// side: "L" = left sidebar, "R" = right sidebar
// Note: sites blocked by X-Frame-Options are menu-only (not used as tiles)
var aURL = [
    ["f3de21", "APRS.FI",     "https://aprs.fi/#!mt=roadmap&z=9&call=VK4DSB&center=-27.05,152.93", 1, "L"],
    ["2196F3", "FT8",         "https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3", 1, "L"],
    ["2196F3", "DX CLUSTER",  "https://www.dxsummit.fi/", 1, "L"],
    ["2196F3", "DX MAP",      "https://www.dxmaps.com/spots/mapg.php?Lan=E&Frec=0&ML=M&Map=OC&HF=1", 1, "L"],
    ["2196F3", "SOLAR WX",    "https://www.sws.bom.gov.au/", 1, "L"],
    ["2196F3", "BOM RADAR",   "https://www.bom.gov.au/australia/radar/", 1, "L"],
    ["2196F3", "TROPO",       "https://dxinfocentre.com/tropo_aus.html", 1, "L"],
    ["2196F3", "GREY LINE",   "https://grayline.info/", 1, "L"],
    ["2196F3", "MESHTASTIC",  "https://meshtastic.liamcottle.net/", 1, "R"],
    ["2196F3", "LIGHTNING",   "https://www.lightningmaps.org/", 1, "R"],
    ["2196F3", "QRZ LOOKUP",  "https://www.qrz.com/lookup/", 1, "R"],
    ["2196F3", "WINDY",       "https://www.windy.com/", 1, "R"],
    ["2196F3", "SIGID",       "https://sigidwiki.com/wiki/Signal_Identification_Guide", 1, "R"],
    ["2196F3", "ACMA MAP",    "https://web.acma.gov.au/rrl/site_proximity.main_page", 1, "R"],
    ["2196F3", "VOACAP",      "https://www.voacap.com/hf/", 1, "R"],
    ["2196F3", "MY SETUP",    "../setup", 1, "R"]
];

// Tiles: first element is the title, remaining elements are image/iframe URLs.
// Multiple URLs per tile rotate on the tileDelay interval.
// Prefixes: "iframe|" = embed as iframe, "invert|" = invert image colours
//
// Image sources used:
//   NOAA SWPC  - https://services.swpc.noaa.gov/images/ (public domain, HTTPS, ~5 min updates)
//   NESDIS     - https://cdn.star.nesdis.noaa.gov/       (GOES-18 satellite, ~10 min updates)
//   Fourmilab  - https://www.fourmilab.ch/               (real-time grey line image)
var aIMG = [
    // --- Row 1: HF Solar & Propagation ---

    // X-ray flux shows solar flares → causes HF radio blackouts (D-layer absorption)
    // K-index shows geomagnetic activity → high K degrades HF propagation
    ["HF Solar Impact",
        "https://services.swpc.noaa.gov/images/goes-xray-flux-6-hour.png",
        "https://services.swpc.noaa.gov/images/noaa-estimated-planetary-k-index-1-minute.png"],

    // Solar wind and southern hemisphere aurora - aurora disrupts polar HF paths from VK
    ["Solar Wind & Aurora",
        "https://services.swpc.noaa.gov/images/solar-wind-speed-density.png",
        "https://services.swpc.noaa.gov/images/geospace/aurora_sh.png"],

    // Ionospheric conditions over Australia - foF2 critical frequency map
    // Shows usable maximum frequency for each path region
    ["Ionosphere AU",
        "https://services.swpc.noaa.gov/images/animations/d-region/now/dregion.png",
        "https://services.swpc.noaa.gov/images/solar-wind-mag-field.png"],

    // Real-time grey line image from Fourmilab - shows where grey-line openings are right now
    ["Grey Line",
        "https://www.fourmilab.ch/cgi-bin/uncgi/Earth?img=NASA500.evif&imgsize=360&dynimg=y&opt=-p"],

    // --- Row 2: HF Digital & DX ---

    // PSKReporter rotates: all HF bands → 40m (best DX for VK4 evenings) → 20m (daytime DX)
    ["FT8 - PSKReporter",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=40m&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=20m&period=3&hideunheard=0&loo=0"],

    // DX Summit - OH8X cluster aggregator, generally iframe-friendly
    ["DX Cluster",
        "iframe|https://www.dxsummit.fi/DxSpots.aspx?count=30"],

    // Live HF DX spots plotted on an Oceania map - shows active paths from/to VK4
    ["DX Map - Oceania HF",
        "iframe|https://www.dxmaps.com/spots/mapg.php?Lan=E&Frec=0&ML=M&Map=OC&HF=1"],

    ["VHF Tropo Ducting",
        "iframe|https://dxinfocentre.com/tropo_aus.html"],

    // --- Row 3: APRS, Satellite & Comms ---

    // APRS rotates: local Bellmere view (z9) → QLD-wide view (z6)
    ["APRS - VK4DSB",
        "iframe|https://aprs.fi/#!mt=roadmap&z=9&call=VK4DSB&center=-27.05,152.93",
        "iframe|https://aprs.fi/#!mt=roadmap&z=6&call=VK4DSB&center=-27.05,152.93"],

    ["Meshtastic Nodes",
        "iframe|https://meshtastic.liamcottle.net/"],

    // ISS tracker rotates with ARISS SSTV gallery (ISS is also a 145.825 MHz APRS digipeater)
    ["ISS + ARISS SSTV",
        "iframe|https://isstracker.pl/en",
        "iframe|https://www.spaceflightsoftware.com/ARISS_SSTV/"],

    ["Lightning Map",
        "iframe|https://www.lightningmaps.org/?lang=en#m=oss;t=3;s=0;o=0;b=;ts=0;tzx=23;tzy=32"],

    // --- Row 4: Weather ---

    // Direct animated GIF from BOM Mt Stapylton radar (IDR66) - covers SE QLD inc. Bellmere
    ["BOM SE QLD Radar",
        "https://www.bom.gov.au/radar/IDR66.gif"],

    ["Wind Conditions",
        "iframe|https://embed.windy.com/embed2.html?lat=-27.05&lon=152.93&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"],

    // GOES-18 true-colour satellite image of Australia - direct JPEG, updates every ~10 min
    ["GOES-18 Australia",
        "https://cdn.star.nesdis.noaa.gov/GOES18/ABI/SECTOR/aus/GEOCOLOR/678x678.jpg"],

    ["UTC Time",
        "iframe|https://time.is/UTC"]
];

// Refresh intervals in milliseconds - one per tile, must match aIMG count (16)
var tileDelay = [
    300000,   // HF Solar Impact      - 5 min (rotates X-ray flux → K-index)
    300000,   // Solar Wind & Aurora  - 5 min (rotates solar wind → aurora S hemi)
    300000,   // Ionosphere AU        - 5 min
    300000,   // Grey Line            - 5 min
    120000,   // FT8 PSKReporter      - 2 min (rotates all → 40m → 20m)
    60000,    // DX Cluster           - 1 min
    120000,   // DX Map Oceania HF    - 2 min
    600000,   // VHF Tropo Ducting    - 10 min
    60000,    // APRS VK4DSB          - 1 min (rotates local → QLD-wide)
    600000,   // Meshtastic Nodes     - 10 min
    120000,   // ISS + ARISS SSTV     - 2 min (rotates ISS tracker → SSTV gallery)
    30000,    // Lightning Map        - 30 sec
    300000,   // BOM SE QLD Radar     - 5 min
    300000,   // Wind Conditions      - 5 min
    600000,   // GOES-18 Australia    - 10 min
    10000     // UTC Time             - 10 sec
];

// RSS feed tickers: [URL, refresh_minutes]
var aRSS = [
    ["https://www.wia.org.au/feed/", 60],
    ["https://www.hamweekly.com/feed/", 120],
    ["https://www.amsat.org/feed/", 60]
];
