export class PresenterDataItem {
    identifier?: string;
    url?: string;
    type?: string;
    subject?: string;
    date?: string;  
    latitude?: number;
    longitude?: number; 
    mapSymbol?: string;
    metadata?: {name: string, value: string}[];
    actions?: {name: string, verb: string}[]; 
  }