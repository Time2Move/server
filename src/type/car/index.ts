export interface Car {
  id: string;
  ownerId: string;
  type: Car.Type;
  number: string; // ooo육1234
  createdAt: Date;
  updatedAt: Date;
}

export namespace Car {
  export type Type =
    | 'SUV'
    | 'SEDAN'
    | 'COUPE'
    | 'HATCHBACK'
    | 'CONVERTIBLE'
    | 'SPORTS_CAR'
    | 'WAGON'
    | 'MINIVAN'
    | 'TRUCK'
    | 'VAN'
    | 'OTHER';

  export interface Snapshot {
    id: string;
    carId: string;
    ownerId: string;
    type: Car.Type;
    number: string; // ooo육1234
    createdAt: Date;
    updatedAt: Date;
  }

  export namespace Create {
    export namespace Request {
      export interface Dto
        extends Omit<Car, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'> {}
    }
    export namespace Response {
      export interface Dto extends Car {}
    }
  }
}
