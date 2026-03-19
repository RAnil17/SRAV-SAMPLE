/* ==========================================================================
   SRAV Products — Exhaustive Product Database (STRICT UNIQUE VISUALS)
   ========================================================================== */

const productsData = [
    // --- WATER TREATMENT ---
    {
        id: "w1",
        name: "Industrial RO Plant (500-50000 LPH)",
        category: "Water Treatment",
        type: "industrial",
        mode: "industrial",
        isPopular: true,
        image: "assets/Industrial-RO-Plant-Installation-Checklist-1080x400.webp",
        description: "High-capacity reverse osmosis systems with PLC integration for industries.",
        features: ["Fully Automated PLC Control", "SS 304/316 Framework", "Antiscalant Dosing System"],
        specs: { "Capacity": "500 LPH to 50 KLD", "Recovery": "Up to 70%", "Membrane": "Filmtec/Hydranautics" }
    },
    {
        id: "w2",
        name: "Commercial RO System (50-250 LPH)",
        category: "Water Treatment",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-commercial-ro-unique.png",
        description: "Compact RO systems for offices, schools, and small hospitals.",
        features: ["Multi-stage Purification", "Compact Design", "Low Maintenance"],
        specs: { "Capacity": "50/100/250 LPH", "Pre-filtration": "Sand & Carbon", "Post-RO": "UV Sterilization" }
    },
    {
        id: "w3",
        name: "SRAV Active RO + Alkaline + Zinc",
        category: "Water Treatment",
        type: "domestic",
        mode: "ecommerce",
        price: 18500,
        isNew: true,
        isPopular: true,
        image: "assets/product-ro.png",
        description: "Premium counter-top RO with mineral fortification for healthy water.",
        features: ["Zinc & Copper Infusion", "Alkaline PH Balancer", "8-Stage Purification"],
        specs: { "Tank": "10 Litres", "Flow Rate": "15 L/Hr", "Input TDS": "Up to 2000 ppm" }
    },
    {
        id: "w4",
        name: "Automatic Water Softener",
        category: "Water Treatment",
        type: "domestic",
        mode: "ecommerce",
        price: 32000,
        image: "assets/product-softener.png",
        description: "Effective scale prevention for bathrooms and kitchens.",
        features: ["Auto-Regeneration", "Food Grade Resin", "Digital Control Valve"],
        specs: { "Capacity": "500 LPH", "Vessel": "FRP", "Salt Storage": "50kg" }
    },
    {
        id: "w5",
        name: "Iron Removal Plant",
        category: "Water Treatment",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-iron-removal-unique.png",
        description: "Advanced oxidation and filtration for high iron content water.",
        features: ["Manganese Zeolite Media", "Automated Backwash", "Odor Removal"]
    },
    {
        id: "w6",
        name: "DM (De-mineralization) Plant",
        category: "Water Treatment",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-dm-plant-unique.png",
        description: "Two-bed and mixed-bed ion exchange for ultra-pure water.",
        features: ["Dual Bed System", "Conductivity Monitoring", "FRP/RLP Construction"]
    },
    {
        id: "w7",
        name: "UV Water Purification System",
        category: "Water Treatment",
        type: "domestic",
        mode: "ecommerce",
        price: 7800,
        image: "assets/product-uv-purifier-unique.png",
        description: "High-intensity UV-C sterilization for pathoghen-free water.",
        features: ["Stainless Steel Chamber", "High-intensity UV Lamp", "Fail-safe Solenoid Valve"]
    },

    // --- WASTEWATER SOLUTIONS ---
    {
        id: "ww1",
        name: "Sewage Treatment Plant (STP)",
        category: "Wastewater Solutions",
        type: "industrial",
        mode: "industrial",
        isPopular: true,
        image: "assets/Role-of-Sewage-Sludge-Treatment-Plant-in-STP.webp",
        description: "Compact MBBR/MBR biology for on-site sewage recycling.",
        features: ["Zero Odor Operation", "Compact Footprint", "PCB Norms Compliant"],
        specs: { "Technology": "MBBR / MBR / SBR", "Scale": "10 KLD to 500 KLD" }
    },
    {
        id: "ww2",
        name: "Effluent Treatment Plant (ETP)",
        category: "Wastewater Solutions",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-industrial-etp-unique.png",
        description: "Chemical and physical treatment for industrial process water.",
        features: ["Heavy Metal Removal", "Color Removal", "ZLD Capability"]
    },
    {
        id: "ww3",
        name: "Industrial Wastewater Solutions",
        category: "Wastewater Solutions",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-industrial-wastewater.png",
        description: "Custom-engineered systems for specialized industrial discharge."
    },

    // --- STERILIZATION & DISINFECTION ---
    {
        id: "s1",
        name: "UV + Ozone Disinfection Chamber",
        category: "Sterilization",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-disinfection-cabinet.png",
        description: "Dual-action sterilization for objects, masks, and tools.",
        features: ["360 Degree Coverage", "Safety Cut-off", "Ozone Neutralizer"]
    },
    {
        id: "s2",
        name: "Disinfection Cabinets",
        category: "Sterilization",
        type: "industrial",
        mode: "industrial",
        image: "assets/images.jpg",
        description: "Medical-grade storage with continuous UV sterilization."
    },
    {
        id: "s3",
        name: "Surface Sterilization Systems",
        category: "Sterilization",
        type: "industrial",
        mode: "industrial",
        image: "assets/project-showcase.png",
        description: "Mobile UV robots and hand-held sterilization units."
    },

    // --- WASTE MANAGEMENT ---
    {
        id: "m1",
        name: "Organic Waste Composting Machine",
        category: "Waste Management",
        type: "industrial",
        mode: "industrial",
        isPopular: true,
        image: "assets/OWC-Machine-1024x768.jpg",
        description: "24-hour on-site conversion of food waste to rich organic fertilizer.",
        features: ["Odorless Operation", "Volume Reduction 90%", "In-built Shredder"],
        specs: { "Capacity": "100kg to 2000kg/day", "Cycle": "24 Hours" }
    },
    {
        id: "m2",
        name: "Food Waste Converter",
        category: "Waste Management",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-bins.png",
        description: "Rapid fermentation system for large kitchens and hotels."
    },
    {
        id: "m3",
        name: "Trio Waste Bins (Segregation)",
        category: "Waste Management",
        type: "domestic",
        mode: "ecommerce",
        price: 6500,
        image: "assets/Aqua-Ultra-Water-Purifiers-3-600x600.jpg",
        description: "Color-coded 3-bin system for efficient source segregation.",
        features: ["Durable HDPE", "Foot Pedal Operation", "Clear Signage"]
    },

    // --- APPLIANCES & EQUIPMENT ---
    {
        id: "h1",
        name: "Ice Cube Maker Machine (Domestic)",
        category: "Appliances",
        type: "domestic",
        mode: "ecommerce",
        price: 24500,
        isNew: true,
        image: "assets/product-ice-machine.png",
        description: "Portable counter-top ice maker for homes and bars.",
        features: ["Quick Freeze (8 mins)", "Bullet Ice Shape", "Auto-clean Feature"]
    },
    {
        id: "h2",
        name: "Commercial Ice Machine",
        category: "Appliances",
        type: "industrial",
        mode: "industrial",
        image: "assets/about-engineers.png",
        description: "Heavy-duty block and flake ice generators for hospitality."
    },
    {
        id: "h3",
        name: "Air Cooler / Humidifier",
        category: "Appliances",
        type: "domestic",
        mode: "ecommerce",
        price: 12400,
        image: "assets/product-cooler.png",
        description: "Powerful honeycomb cooling for large living spaces.",
        features: ["Ice Chamber", "3-Speed Fan", "Anti-dust Filter"]
    },
    {
        id: "h4",
        name: "Digital Water Heater - 25L",
        category: "Appliances",
        type: "domestic",
        mode: "ecommerce",
        price: 9800,
        image: "assets/services-engineers.png",
        description: "Glass-lined storage heater with high energy efficiency.",
        features: ["Hard Water Protection", "Digital Display", "8 Bar Pressure"]
    },
    {
        id: "h5",
        name: "Bulk Home & Commercial Appliances",
        category: "Appliances",
        type: "industrial",
        mode: "industrial",
        image: "assets/background-video.mp4.mp4",
        description: "Wholesale supply of kitchen, cleaning, and utility appliances."
    },

    // --- AUTOMATION & ELECTRICAL ---
    {
        id: "a1",
        name: "Electrical Panel Board (LT/HT)",
        category: "Automation & Electrical",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-automation-panel-new.png",
        description: "Custom-built power distribution and control panels."
    },
    {
        id: "a2",
        name: "PLC/SCADA Control Panels",
        category: "Automation & Electrical",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-automation-panel.png",
        description: "Intelligent process control boards for water plants.",
        features: ["Schneider/ABB Components", "HMI Visuals", "IoT Enabled"]
    },
    {
        id: "a3",
        name: "Home Automation Systems",
        category: "Automation & Electrical",
        type: "industrial",
        mode: "industrial",
        isNew: true,
        image: "assets/logo.jpeg",
        description: "Smart lighting, security, and climate control for luxury residences."
    },
    {
        id: "a4",
        name: "Industrial Automation Solutions",
        category: "Automation & Electrical",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-automation-robotics.png",
        description: "Full factory automation using robotics and smart sensors."
    },

    // --- ESD SOLUTIONS ---
    {
        id: "esd1",
        name: "ESD Anti-Static Flooring",
        category: "ESD Solutions",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-esd-bench.png",
        description: "Epoxy and PVC static dissipative flooring for electronics manufacturing."
    },
    {
        id: "esd2",
        name: "ESD Workstations",
        category: "ESD Solutions",
        type: "industrial",
        mode: "industrial",
        image: "assets/product-softener.png",
        description: "Ergonomic furniture with grounded surfaces and wrist strap points."
    },
    {
        id: "esd3",
        name: "ESD Anti-Static Mat (2-Layer)",
        category: "ESD Solutions",
        type: "domestic",
        mode: "ecommerce",
        price: 4200,
        image: "assets/product-ro.png",
        description: "Heat resistant rubber mat for desktop electronic repairs.",
        features: ["Heat Resistant", "Dual Layer Dissipative", "Size: 2ft x 4ft"]
    },
    {
        id: "esd4",
        name: "ESD Accessories (Straps, Tools)",
        category: "ESD Solutions",
        type: "domestic",
        mode: "ecommerce",
        price: 1500,
        image: "assets/Industrial-RO-Plant-Installation-Checklist-1080x400.webp",
        description: "Complete kit of wrist straps, grounding cords, and antistatic brushes."
    }
];

// Metadata for categories
const categoriesData = [
    { id: "water", name: "Water Treatment", icon: "fas fa-faucet-drip" },
    { id: "wastewater", name: "Wastewater Solutions", icon: "fas fa-recycle" },
    { id: "sterilization", name: "Sterilization", icon: "fas fa-virus-slash" },
    { id: "waste", name: "Waste Management", icon: "fas fa-trash-can" },
    { id: "appliances", name: "Appliances", icon: "fas fa-home" },
    { id: "automation", name: "Automation & Electrical", icon: "fas fa-microchip" },
    { id: "esd", name: "ESD Solutions", icon: "fas fa-bolt" }
];
