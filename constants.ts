
import { Exercise } from './types';

const SCHOOL = {
  name: "INSTITUT SAINT-LUC DE FRAMERIES",
  address: "Rue de la Libération 1, 7080 Frameries"
};

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "Équipement Multimédia",
    description: "Réception de matériel pour le laboratoire d'informatique.",
    purchaseOrder: {
      id: "BC-2025-0112",
      date: "12/02/2025",
      vendor: { name: "OFFICE-TECH SOLUTIONS", address: "Avenue de l'Innovation 42, 1300 Wavre", details: "TVA BE0888.123.456" },
      buyer: SCHOOL,
      items: [
        { ref: "KEY-64-USB", designation: "Clé USB 64GB Kingston", quantity: 12, unit: "Pcs", pu: 15.50 },
        { ref: "PAP-A4-80", designation: "Ramette Papier A4 80g", quantity: 8, unit: "Ct", pu: 22.00 },
        { ref: "SOU-LOG-MX", designation: "Souris Logitech MX Anywhere 3S (SANS FIL)", quantity: 5, unit: "Pcs", pu: 79.00 }
      ],
      conditions: "Livraison franco - Paiement 30 jours"
    },
    deliveryNote: {
      id: "BL-2025-0988",
      date: "18/02/2025",
      orderRef: "BC-2025-0112",
      orderDate: "12/02/2025",
      parcelCount: 3,
      vendor: { name: "OFFICE-TECH SOLUTIONS", address: "Avenue de l'Innovation 42, 1300 Wavre", details: "TVA BE0888.123.456" },
      buyer: SCHOOL,
      items: [
        { ref: "KEY-64-USB", designation: "Clé USB 64GB Kingston", quantity: 12, unit: "Pcs" },
        { ref: "PAP-A4-80", designation: "Ramette Papier A4 80g", quantity: 8, unit: "Ct" }, // ERREUR PHYSIQUE : Il n'y en a que 6 dans le colis
        { ref: "SOU-LOG-M5", designation: "Souris Logitech M500 (FILAIRE)", quantity: 5, unit: "Pcs" } // ERREUR REF/PRODUIT
      ],
      conditions: "Paiement au comptant" // ERREUR CONDITIONS
    },
    physicalDelivery: [
      { id: 1, label: "Colis 1/3", isOpen: false, content: [{ ref: "KEY-64-USB", designation: "Clé USB 64GB Kingston", quantity: 12 }] },
      { id: 2, label: "Colis 2/3", isOpen: false, content: [{ ref: "PAP-A4-80", designation: "Ramette Papier A4 80g", quantity: 6 }] }, // MANQUANT
      { id: 3, label: "Colis 3/3", isOpen: false, content: [{ ref: "SOU-LOG-M5", designation: "Souris Logitech M500", quantity: 5 }] }
    ]
  },
  {
    id: 2,
    title: "Fournitures Horeca",
    description: "Réception pour les cuisines de la section Restauration.",
    purchaseOrder: {
      id: "BC-H-99",
      date: "05/03/2025",
      vendor: { name: "PRO-CHEF BELGIUM", address: "Zoning Industriel, 1400 Nivelles", details: "TVA BE0123.456.789" },
      buyer: SCHOOL,
      items: [
        { ref: "FOUR-PRO-X", designation: "Four à convection Professionnel 4 niveaux", quantity: 1, unit: "Pcs", pu: 1250.00 },
        { ref: "MIX-DYNAMIC", designation: "Mixeur plongeant Dynamic MX98", quantity: 2, unit: "Pcs", pu: 185.00 },
        { ref: "VER-VIN-6", designation: "Lot 6 verres à vin cristal 35cl", quantity: 20, unit: "Lot", pu: 45.00 }
      ],
      conditions: "Livraison 1er étage - Paiement 15 jours"
    },
    deliveryNote: {
      id: "BL-CHEF-502",
      date: "12/03/2025",
      orderRef: "BC-H-99",
      orderDate: "05/03/2025",
      parcelCount: 3,
      vendor: { name: "PRO-CHEF BELGIUM", address: "Zoning Industriel, 1400 Nivelles", details: "TVA BE0123.456.789" },
      buyer: SCHOOL,
      items: [
        { ref: "FOUR-ECO-V", designation: "Four à convection VERSION ECO (Moins puissant)", quantity: 1, unit: "Pcs" }, // ERREUR REF
        { ref: "MIX-DYNAMIC", designation: "Mixeur plongeant Dynamic MX98", quantity: 2, unit: "Pcs" },
        { ref: "VER-VIN-6", designation: "Lot 6 verres à vin cristal 35cl", quantity: 20, unit: "Lot" } // ERREUR PHYSIQUE : 2 lots cassés/manquants
      ],
      conditions: "Livraison franco quai" // ERREUR CONDITIONS (pas d'étage)
    },
    physicalDelivery: [
      { id: 1, label: "Palette 1", isOpen: false, content: [{ ref: "FOUR-ECO-V", designation: "Four ECO", quantity: 1 }] },
      { id: 2, label: "Colis 2", isOpen: false, content: [{ ref: "MIX-DYNAMIC", designation: "Mixeur", quantity: 2 }] },
      { id: 3, label: "Caisse 3", isOpen: false, content: [{ ref: "VER-VIN-6", designation: "Lot de verres", quantity: 18 }] } // MANQUANTS
    ]
  },
  {
    id: 3,
    title: "Atelier Maintenance",
    description: "Matériel pour les sections techniques et maintenance.",
    purchaseOrder: {
      id: "BC-ATEL-45",
      date: "10/01/2025",
      vendor: { name: "OUTILS & CO", address: "Boulevard Industriel, 7000 Mons", details: "TVA BE0999.888.777" },
      buyer: SCHOOL,
      items: [
        { ref: "PERF-BOSCH-18", designation: "Perforateur Bosch 18V - 2 batteries", quantity: 3, unit: "Pcs", pu: 320.00 },
        { ref: "VIS-TH-50", designation: "Boite 100 vis TH 5x50 Inox", quantity: 10, unit: "Bte", pu: 12.00 },
        { ref: "PRO-CAS-3M", designation: "Casque anti-bruit 3M Peltor", quantity: 15, unit: "Pcs", pu: 35.00 }
      ],
      conditions: "Livraison Express - Remise 5% incluse"
    },
    deliveryNote: {
      id: "BL-OUT-1004",
      date: "15/01/2025",
      orderRef: "BC-ATEL-45",
      orderDate: "10/01/2025",
      parcelCount: 2,
      vendor: { name: "OUTILS & CO", address: "Boulevard Industriel, 7000 Mons", details: "TVA BE0999.888.777" },
      buyer: SCHOOL,
      items: [
        { ref: "PERF-MAKITA-18", designation: "Perforateur Makita 18V (Équivalent)", quantity: 3, unit: "Pcs" }, // ERREUR MARQUE/REF
        { ref: "VIS-TH-50", designation: "Boite 100 vis TH 5x50 Inox", quantity: 12, unit: "Bte" }, // ERREUR QUANTITE (Trop sur BL)
        { ref: "PRO-CAS-3M", designation: "Casque anti-bruit 3M Peltor", quantity: 15, unit: "Pcs" }
      ],
      conditions: "Livraison standard" // ERREUR CONDITIONS
    },
    physicalDelivery: [
      { id: 1, label: "Caisse Outils", isOpen: false, content: [{ ref: "PERF-MAKITA-18", designation: "Perforateur Makita", quantity: 3 }] },
      { id: 2, label: "Carton Quincaillerie", isOpen: false, content: [
        { ref: "VIS-TH-50", designation: "Vis Inox", quantity: 10 }, // SEULEMENT 10 EN COLIS
        { ref: "PRO-CAS-3M", designation: "Casques", quantity: 15 }
      ]}
    ]
  }
];
