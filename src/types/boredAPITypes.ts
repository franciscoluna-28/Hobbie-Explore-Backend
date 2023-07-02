// Without changing the key parameter to id
export interface DefaultBoredAPIActivity {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
    key: string;
    accessibility: number;
  }

// After processing the key and using it as the ID
export interface BoredAPIModifiedActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  id: string;
  accessibility: number;
}


  