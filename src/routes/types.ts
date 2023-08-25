// types.ts

// Discount related types
export interface Discount {
    type: DiscountType; // Art des Rabatts
    value: number; // Wert des Rabatts (z.B. 10 für 10% oder 5 für 5€)
    itemId?: string; // Eindeutige ID des Rabatts
    progressToNextTrigger?: number;
    progressUnitsToNextTrigger?: number;
    description: string; // Kurze Beschreibung des Rabatts
    appliedTo: 'total' | 'item'; // Gibt an, ob der Rabatt auf den Gesamtbetrag oder einen bestimmten Artikel angewendet wird

    // Liste der Artikel-IDs, auf die der Rabatt angewendet wird
    itemIds?: string[]; 

    // Details für Rabatte pro Einheit
    perUnitDiscount?: number; // Rabattbetrag pro Einheit
    totalUnitDiscount?: number; // Gesamtrabatt für das Produkt basierend auf der Anzahl der Einheiten
    totalOrderDiscount?: number; // Gesamtrabatt für die gesamte Bestellung

    // Trigger-Informationen
    triggers: DiscountTrigger[]; // Liste der Trigger, die diesen Rabatt aktivieren
    nextTrigger?: DiscountTrigger; // Der nächste Trigger, der erreicht werden muss, um einen weiteren Rabatt zu erhalten

    // Fortschritt bis zum nächsten Trigger
    progressToNextTriggerPercentage?: number; // Fortschritt in Prozent
    progressToNextTriggerCount?: number; // Fortschritt in Anzahl der Produkte oder Varianten
}

export enum DiscountType {
    PercentFlat = "percentFlat",
    PerUnitFlat = "perUnitFlat",
    PerUnitPercent = "perUnitPercent",
    Flat = "flat",
}

export interface DiscountTrigger {
    type: 'quantity' | 'price'; // Art des Triggers (z.B. basierend auf Menge oder Preis)
    threshold: number; // Schwellenwert, der erreicht werden muss, um den Rabatt zu aktivieren
    span?: number; // Spanne oder Bereich, in dem der Rabatt gültig ist (z.B. für Mengenrabatte zwischen 10 und 20 Einheiten)
}

// Cart related types
export interface CartData {
    items: CartItem[];
    total: number;
    currency?: string; // Währung des Warenkorbs
    appliedDiscounts?: Discount[]; // Liste der auf den Warenkorb angewendeten Rabatte
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number; // Menge des Artikels im Warenkorb
    variant?: string; // Produktvariante, falls zutreffend
    appliedDiscount?: Discount; // Rabatt, der auf diesen Artikel angewendet wird
}

// Product and Collection related types
export interface Product {
    id: string;
    name: string;
    variants?: ProductVariant[];
}

export interface ProductVariant {
    id: string;
    name: string;
    price: number;
}

export interface Collection {
    id: string;
    name: string;
    title: string; // Fügen Sie diese Zeile hinzu
    products: Product[];
}

// ... Weitere Typen, die Sie definieren möchten
