export interface Promotion {
  id: string; 
  title: string;
  category: string;
  active: boolean;     
  startDate: string;
  endDate: string;
  optedIn?: boolean;   
}