// Ham Dashboard - VK4DSB - Bellmere QLD

var topBarCenterText = "VK4DSB - QG62 - Bellmere QLD";

var layout_cols = 4;
var layout_rows = 4;

// Menu items: [color, label, URL, scale, side]
// side: "L" = left sidebar, "R" = right sidebar
// Note: sites blocked by X-Frame-Options are menu-only (not used as tiles)
var aURL = [
    ["f3de21", "APRS",        "https://aprs.to/map/VK4DSB", 1, "L"],
    ["2196F3", "FT8",         "https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3", 1, "L"],
    ["2196F3", "DX CLUSTER",  "https://www.dxsummit.fi/", 1, "L"],
    ["2196F3", "DX MAP",      "https://www.dxmaps.com/spots/mapg.php?Lan=E&Frec=0&ML=M&Map=OC&HF=1", 1, "L"],
    ["2196F3", "SOLAR WX",    "https://www.sws.bom.gov.au/", 1, "L"],
    ["2196F3", "BOM RADAR",   "https://www.bom.gov.au/australia/radar/", 1, "L"],
    ["2196F3", "RAINVIEWER",  "https://www.rainviewer.com/", 1, "L"],
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

    // Space weather overview + K-index. K-index > 4 starts degrading HF propagation.
    ["Space Weather",
        "https://services.swpc.noaa.gov/images/swx-overview-large.gif",
        "https://services.swpc.noaa.gov/images/station-k-index.png"],

    // ACE solar wind speed/density + southern hemisphere aurora forecast.
    // When aurora is active over Antarctica, polar HF paths from VK are disrupted.
    ["Solar Wind & Aurora",
        "https://services.swpc.noaa.gov/images/ace-swepam-2-hour.gif",
        "https://services.swpc.noaa.gov/images/aurora-forecast-southern-hemisphere.jpg"],

    // Geospace 1-day view + ACE IMF Bz (interplanetary magnetic field).
    // Bz going strongly negative (southward) is the key trigger for geomagnetic storms.
    ["Geospace / IMF Bz",
        "https://services.swpc.noaa.gov/images/geospace_1_day.png",
        "https://services.swpc.noaa.gov/images/ace-mag-2-hour.gif"],

    // Real-time grey line image from Fourmilab - shows where grey-line openings are right now
    ["Grey Line",
        "https://www.fourmilab.ch/cgi-bin/uncgi/Earth?img=NASA500.evif&imgsize=360&dynimg=y&opt=-p"],

    // --- Row 2: HF Digital & DX ---

    // PSKReporter rotates: all HF bands → 40m (best DX for VK4 evenings) → 20m (daytime DX)
    ["FT8 - PSKReporter",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=0&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=40m&period=3&hideunheard=0&loo=0",
        "iframe|https://pskreporter.info/pskmap.html?what=lhrd&callsign=VK4DSB&mode=FT8&band=20m&period=3&hideunheard=0&loo=0"],

    // DX Summit - clean spot list, focused on Oceania
    ["DX Cluster",
        "iframe|https://www.dxsummit.fi/DxSpots.aspx?count=20&de_cont=OC"],

    // Live HF DX spots plotted on an Oceania map - shows active paths from/to VK4
    ["DX Map - Oceania HF",
        "iframe|https://www.dxmaps.com/spots/mapg.php?Lan=E&Frec=0&ML=M&Map=OC&HF=1"],

    ["VHF Tropo Ducting",
        "iframe|https://dxinfocentre.com/tropo_aus.html"],

    // --- Row 3: APRS, Satellite & Comms ---

    // aprs.fi has frame-busting JS that redirects the whole page - use aprs.to instead
    ["APRS - VK4DSB",
        "iframe|https://aprs.to/map/VK4DSB"],

    ["Meshtastic Nodes",
        "iframe|https://meshtastic.liamcottle.net/"],

    // ISS tracker rotates with ARISS SSTV gallery (ISS is also a 145.825 MHz APRS digipeater)
    ["ISS + ARISS SSTV",
        "iframe|https://isstracker.pl/en",
        "iframe|https://www.spaceflightsoftware.com/ARISS_SSTV/"],

    ["Lightning Map",
        "iframe|https://www.lightningmaps.org/"],

    // --- Row 4: Weather ---

    // RainViewer radar - BOM hotlink-blocks their GIFs from external sites
    // Centred on Bellmere QLD at zoom 8 with radar and cloud overlays
    ["SE QLD Radar",
        "iframe|https://www.rainviewer.com/map.html?loc=-27.05,152.93,8&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&rmt=4&c=3&o=83&lm=0&th=0&sm=1&sn=1"],

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
