export const PRODUCT_CATEGORIES = [
  {
    value: 'General merchandise',
    label: 'General merchandise',
    description: 'Flexible template for everyday consumer and retail goods.',
    fields: [
      ['composition', 'Materials / product composition', 'List materials, components or ingredients', true],
      ['specifications', 'Product specifications', 'Model, size, dimensions, colour, features or other specifications', true],
      ['instructions', 'Usage / care instructions', 'How to use, install, clean or maintain the product', true],
      ['warnings', 'Warnings / safety information', 'Add applicable cautions and safe-use information', true],
    ],
  },
  {
    value: 'Food & beverages', label: 'Food & beverages', description: 'Packaged food, drinks, ingredients and supplements.',
    fields: [
      ['composition', 'Ingredients / composition', 'Ingredient list in the required declaration order', true],
      ['specifications', 'Nutrition / product information', 'Nutrition facts, grade, flavour or product attributes', true],
      ['instructions', 'Storage / preparation instructions', 'Storage, preparation and serving directions', true],
      ['warnings', 'Allergens / dietary / safety declarations', 'Allergens and other applicable product warnings', true],
    ],
  },
  {
    value: 'Cosmetics & personal care', label: 'Cosmetics & personal care', description: 'Beauty, skincare, haircare, hygiene and personal-care products.',
    fields: [
      ['composition', 'Ingredients / INCI composition', 'Ingredient declaration using the applicable nomenclature', true],
      ['specifications', 'Product details', 'Shade, skin or hair type, size, variant or performance details', true],
      ['instructions', 'Directions for use', 'Application, usage, storage and disposal instructions', true],
      ['warnings', 'Warnings / precautions', 'Usage restrictions, patch-test or eye-contact warnings, where applicable', true],
    ],
  },
  {
    value: 'Pharmaceuticals & medical devices', label: 'Pharmaceuticals & medical devices', description: 'Medicines, diagnostics, medical equipment and healthcare products.',
    fields: [
      ['composition', 'Active ingredients / material composition', 'Active substances, strength or device materials', true],
      ['specifications', 'Strength / model / technical details', 'Dosage form, concentration, device model or intended purpose', true],
      ['instructions', 'Directions / instructions for use', 'Dosage, administration, setup or operating directions', true],
      ['warnings', 'Contraindications / safety warnings', 'Important warnings, precautions and restrictions', true],
    ],
  },
  {
    value: 'Household & cleaning', label: 'Household & cleaning', description: 'Detergents, cleaners, home-care and household goods.',
    fields: [
      ['composition', 'Ingredients / material composition', 'Chemical ingredients or material composition', true],
      ['specifications', 'Product specifications', 'Concentration, size, surface compatibility or product features', true],
      ['instructions', 'Directions for use', 'Dilution, application, cleaning and disposal directions', true],
      ['warnings', 'Hazards / safety precautions', 'Handling, storage, first-aid and child-safety warnings', true],
    ],
  },
  {
    value: 'Electronics & electrical', label: 'Electronics & electrical', description: 'Consumer electronics, appliances, components and electrical equipment.',
    fields: [
      ['composition', 'Materials / component information', 'Materials, battery chemistry or key components', true],
      ['specifications', 'Electrical / technical specifications', 'Voltage, current, power, frequency, model and ratings', true],
      ['instructions', 'Setup / operation instructions', 'Installation, charging, operation and maintenance guidance', true],
      ['warnings', 'Electrical / product safety warnings', 'Electrical, battery, heat and disposal precautions', true],
    ],
  },
  {
    value: 'Apparel & textiles', label: 'Apparel & textiles', description: 'Clothing, footwear, fabrics, home textiles and accessories.',
    fields: [
      ['composition', 'Fibre / material composition', 'Fibre percentages, leather or other material details', true],
      ['specifications', 'Size / colour / style details', 'Size, fit, colour, style, SKU or assortment details', true],
      ['instructions', 'Care instructions', 'Washing, drying, ironing and care symbols or text', true],
      ['warnings', 'Warnings / special care', 'Applicable age, flammability or special-care warnings', true],
    ],
  },
  {
    value: 'Toys & baby products', label: 'Toys & baby products', description: 'Toys, nursery goods, childcare and children’s products.',
    fields: [
      ['composition', 'Materials / component information', 'Materials, coatings, fillings and included components', true],
      ['specifications', 'Age grade / product specifications', 'Recommended age, model, dimensions and included parts', true],
      ['instructions', 'Assembly / use instructions', 'Assembly, supervision, cleaning and use instructions', true],
      ['warnings', 'Child safety / choking / usage warnings', 'Age restrictions, choking hazards and supervision warnings', true],
    ],
  },
  {
    value: 'Automotive & transport', label: 'Automotive & transport', description: 'Vehicle parts, accessories, lubricants and transport equipment.',
    fields: [
      ['composition', 'Material / fluid composition', 'Materials, formulation or component details', true],
      ['specifications', 'Part number / fitment / specifications', 'Part number, compatible models, dimensions and ratings', true],
      ['instructions', 'Installation / maintenance instructions', 'Fitment, service, operating and maintenance directions', true],
      ['warnings', 'Vehicle / handling safety warnings', 'Installation, compatibility and operating precautions', true],
    ],
  },
  {
    value: 'Chemicals & agriculture', label: 'Chemicals & agriculture', description: 'Industrial and agricultural chemicals, fertilizers and crop products.',
    fields: [
      ['composition', 'Active substances / composition', 'Active ingredients, concentration and formulation details', true],
      ['specifications', 'Grade / concentration / classification', 'Product grade, strength, classification and technical details', true],
      ['instructions', 'Application / handling instructions', 'Directions, dosage, dilution, handling and storage', true],
      ['warnings', 'Hazard / precautionary statements', 'Applicable hazard, PPE, first-aid and environmental warnings', true],
    ],
  },
  {
    value: 'Industrial & machinery', label: 'Industrial & machinery', description: 'Tools, equipment, machinery, spare parts and industrial supplies.',
    fields: [
      ['composition', 'Materials / component composition', 'Materials, alloys, components or included parts', true],
      ['specifications', 'Technical specifications', 'Part number, dimensions, tolerance, capacity and ratings', true],
      ['instructions', 'Operating / installation instructions', 'Installation, operation, inspection and maintenance guidance', true],
      ['warnings', 'Operational / workplace safety warnings', 'Machine, electrical, lifting and workplace precautions', true],
    ],
  },
  {
    value: 'Building & construction materials', label: 'Building & construction materials', description: 'Paints, coatings, fixtures, materials and construction products.',
    fields: [
      ['composition', 'Material / chemical composition', 'Material type, ingredients or constituent composition', true],
      ['specifications', 'Technical / performance specifications', 'Grade, dimensions, coverage, rating and standards references', true],
      ['instructions', 'Installation / application instructions', 'Preparation, application, curing and maintenance instructions', true],
      ['warnings', 'Site / handling safety warnings', 'PPE, ventilation, handling and installation precautions', true],
    ],
  },
  {
    value: 'Jewelry & accessories', label: 'Jewelry & accessories', description: 'Jewelry, watches, eyewear, bags and fashion accessories.',
    fields: [
      ['composition', 'Material / metal / stone details', 'Metal purity, plating, gemstone or material details', true],
      ['specifications', 'Size / weight / product details', 'Dimensions, size, weight, model or collection details', true],
      ['instructions', 'Care / maintenance instructions', 'Cleaning, storage and maintenance guidance', true],
      ['warnings', 'Warnings / material disclosures', 'Allergy, small-part or other applicable warnings', true],
    ],
  },
  {
    value: 'Paper, stationery & office supplies',
    label: 'Paper, stationery & office supplies',
    description: 'Paper goods, stationery, school supplies and office products.',
    fields: [
      ['composition', 'Paper / material composition', 'Paper grade, coating, ink, adhesive or other materials', true],
      ['specifications', 'Size / grade / product specifications', 'Sheet size, weight, count, format, grade or model', true],
      ['instructions', 'Use / storage instructions', 'Storage, handling, recycling or product-use guidance', true],
      ['warnings', 'Warnings / disposal information', 'Applicable safety, age, recycling or disposal information', false],
    ],
  },
  {
    value: 'Home, garden & outdoor living',
    label: 'Home, garden & outdoor living',
    description: 'Furniture, homeware, garden goods, décor and outdoor-living products.',
    fields: [
      ['composition', 'Materials / components', 'Materials, finishes, coatings and included parts', true],
      ['specifications', 'Dimensions / product specifications', 'Dimensions, weight, colour, model and included accessories', true],
      ['instructions', 'Assembly / care instructions', 'Assembly, installation, cleaning and maintenance guidance', true],
      ['warnings', 'Safety / care warnings', 'Stability, load, placement, child safety or handling warnings', false],
    ],
  },
  {
    value: 'Other / custom product',
    label: 'Other / custom product',
    description: 'A flexible template for any product, niche industry or custom back-label requirement.',
    fields: [
      ['composition', 'Materials / ingredients / components', 'Describe what the product is made from or what it contains', true],
      ['specifications', 'Product details / technical specifications', 'Add the details customers, operators or distributors need', true],
      ['instructions', 'Directions / care / storage information', 'Add instructions appropriate to the product', false],
      ['warnings', 'Warnings / regulatory / disposal information', 'Add any warnings, declarations or disposal information that apply', false],
    ],
  },
  {
    value: 'Pet products', label: 'Pet products', description: 'Pet food, treats, grooming, accessories and animal-care products.',
    fields: [
      ['composition', 'Ingredients / material composition', 'Ingredients, nutrients or material composition', true],
      ['specifications', 'Product / animal suitability details', 'Species, life stage, size, flavour or product attributes', true],
      ['instructions', 'Feeding / use / care instructions', 'Feeding guide, application or cleaning directions', true],
      ['warnings', 'Warnings / precautions', 'Storage, suitability and applicable safety warnings', true],
    ],
  },
  {
    value: 'Sports & outdoor', label: 'Sports & outdoor', description: 'Fitness, sporting goods, camping and outdoor equipment.',
    fields: [
      ['composition', 'Materials / component information', 'Materials, components and included accessories', true],
      ['specifications', 'Size / performance specifications', 'Size, weight, capacity, rating and model information', true],
      ['instructions', 'Use / assembly / care instructions', 'Setup, safe-use, maintenance and storage guidance', true],
      ['warnings', 'Use / injury-prevention warnings', 'Limitations, protective equipment and safety precautions', true],
    ],
  },
];

export const TARGET_MARKETS = [
  'Global / multiple markets',
  'India',
  'United States',
  'European Union',
  'United Kingdom',
  'Canada',
  'Australia',
  'Japan',
  'China',
  'United Arab Emirates',
  'Saudi Arabia',
  'Brazil',
  'Mexico',
  'South Africa',
  'New Zealand',
  'Singapore',
  'South Korea',
  'Indonesia',
  'Malaysia',
  'Thailand',
  'Vietnam',
  'Switzerland',
  'Turkey',
  'Other / not listed',
];

export function getCategoryTemplate(category) {
  return PRODUCT_CATEGORIES.find((item) => item.value === category) || PRODUCT_CATEGORIES[0];
}
