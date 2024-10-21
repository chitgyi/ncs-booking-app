export interface Room {
  name: string;
  capacity: string;
  level: string;
  availability: {
    [key: string]: string;
  };
}
