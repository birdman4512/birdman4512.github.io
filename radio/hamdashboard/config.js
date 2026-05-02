// Ham Dashboard - VK4DSB - Bellmere QLD

var topBarCenterText = "VK4DSB - QG62 - Bellmere QLD";

var layout_cols = 4;
var layout_rows = 4;

// Menu items: [color, label, URL, scale, side]
// side: "L" = left sidebar, "R" = right sidebar
var aURL = [
    ["f3de21", "APRS.FI",     "https://aprs.fi/#!mt=roadmap&z=9&call=VK4DSB&center=-27.05,152.93", 1, "L"],
    ["2196F3", "FT8",         "https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3", 1, "L"],
    ["2196F3", "DX CLUSTER",  "https://www.dxwatch.com/", 1, "L"],
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
var aIMG = [
    // Row 1: HF Propagation & Solar
    // HF band conditions rotate between the HF chart and VHF/UHF chart
    ["HF Band Conditions",
        "https://www.hamqsl.com/solar101.php",
        "https://www.hamqsl.com/solar101vhf.php"],

    // Solar data: key indices for HF (SFI, K-index, A-index)
    ["Solar Data",
        "https://www.hamqsl.com/solar.gif"],

    // Australian space weather from the Bureau of Meteorology
    ["Space Weather AU",
        "iframe|https://www.sws.bom.gov.au/"],

    // Grey line shows the day/night terminator - critical for HF grey-line openings
    ["Grey Line",
        "iframe|https://grayline.info/"],

    // Row 2: HF Digital & DX
    // PSKReporter rotates through all bands, then 40m, then 20m (most active HF bands for VK4)
    ["FT8 - PSKReporter",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=40m&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=20m&period=3&hideunheard=0&loo=0"],

    ["DX Cluster",
        "iframe|https://www.dxwatch.com/"],

    // Live HF DX spots plotted on an Oceania map - shows what's active from/to VK4
    ["DX Map - Oceania HF",
        "iframe|https://www.dxmaps.com/spots/mapg.php?Lan=E&Frec=0&ML=M&Map=OC&HF=1"],

    ["VHF Tropo Ducting",
        "iframe|https://dxinfocentre.com/tropo_aus.html"],

    // Row 3: APRS, Satellite & Comms
    // APRS rotates between local Bellmere view (z9) and QLD-wide view (z6)
    ["APRS - VK4DSB",
        "iframe|https://aprs.fi/#!mt=roadmap&z=9&call=VK4DSB&center=-27.05,152.93",
        "iframe|https://aprs.fi/#!mt=roadmap&z=6&call=VK4DSB&center=-27.05,152.93"],

    ["Meshtastic Nodes",
        "iframe|https://meshtastic.liamcottle.net/"],

    // ISS tracker rotates with ARISS SSTV gallery (ISS is also a 145.825 APRS digipeater)
    ["ISS + ARISS SSTV",
        "iframe|https://isstracker.pl/en",
        "iframe|https://www.spaceflightsoftware.com/ARISS_SSTV/"],

    ["Lightning Map",
        "iframe|https://www.lightningmaps.org/?lang=en#m=oss;t=3;s=0;o=0;b=;ts=0;tzx=23;tzy=32"],

    // Row 4: Weather
    // Direct animated GIF from BOM Mt Stapylton radar (covers SE QLD including Bellmere)
    ["BOM SE QLD Radar",
        "https://www.bom.gov.au/radar/IDR66.gif"],

    ["Wind Conditions",
        "iframe|https://embed.windy.com/embed2.html?lat=-27.05&lon=152.93&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"],

    ["BOM Satellite",
        "iframe|https://www.bom.gov.au/australia/satellite/"],

    ["UTC Time",
        "iframe|https://time.is/UTC"]
];

// Refresh intervals in milliseconds - one per tile, must match aIMG count (16)
var tileDelay = [
    600000,   // HF Band Conditions   - 10 min (rotates HF → VHF banners)
    300000,   // Solar Data           - 5 min
    600000,   // Space Weather AU     - 10 min
    300000,   // Grey Line            - 5 min
    120000,   // FT8 PSKReporter      - 2 min (rotates all bands → 40m → 20m)
    120000,   // DX Cluster           - 2 min
    120000,   // DX Map Oceania HF    - 2 min
    600000,   // VHF Tropo Ducting    - 10 min
    60000,    // APRS VK4DSB          - 1 min (rotates local → QLD-wide)
    600000,   // Meshtastic Nodes     - 10 min
    120000,   // ISS + ARISS SSTV     - 2 min (rotates ISS tracker → SSTV gallery)
    30000,    // Lightning Map        - 30 sec
    300000,   // BOM SE QLD Radar     - 5 min
    300000,   // Wind Conditions      - 5 min
    600000,   // BOM Satellite        - 10 min
    10000     // UTC Time             - 10 sec
];

// RSS feed tickers: [URL, refresh_minutes]
var aRSS = [
    ["https://www.wia.org.au/feed/", 60],
    ["https://www.hamweekly.com/feed/", 120],
    ["https://www.amsat.org/feed/", 60]
];
