export class Barcode {
    
    constructor(
        public code: string,
        public elementType: string,
        public format: string,
        public color: string,
        public fontSize: number,
        public textPosition: 'top' | 'bottom',
        public backgroundColor: string,
        public valid: boolean,
    ) {

    }
}

export enum BarcodeFormat {
    CODE128 = 'CODE128',
    CODE128A = 'CODE128A',
    CODE128B = 'CODE128B',
    CODE128C = 'CODE128C',
    // EAN = 'EAN', will cause an error if used
    UPC = 'UPC',
    EAN8 = 'EAN8',
    EAN5 = 'EAN5',
    EAN2 = 'EAN2',
    CODE39 = 'CODE39',
    ITF14 = 'ITF14',
    MSI = 'MSI',
    MSI10 = 'MSI10',
    MSI11 = 'MSI11',
    MSI1010 = 'MSI1010',
    MSI1110 = 'MSI1110',
    pharmacode = 'pharmacode',
}

/** Barcode scanner can scan CODE 128, 128A, 128B, 128C
 * UPC
 * EAN8
 * CODE39
 * ITF14
 * 
 */

/** barcode scanner native plugin cannot scan these
 * EAN 5
 * EAN 2
 * MSI
 * Pharmacode
 */