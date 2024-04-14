export interface Parking {
  id: string;
  carId: string;
  driverId: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
export namespace Parking {
  export namespace GetList {
    export namespace Request {
      export interface Query {
        latitude: number;
        longitude: number;
      }
    }
    export namespace Response {
      export interface Dto {
        id: string;
        carId: string;
        driverId: string;
        address: string;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
      }
    }
  }

  export namespace Create {
    export namespace Request {
      export interface Dto {
        drivingId: string;
        address: string;
        latitude: number;
        longitude: number;
        startDate: Date;
        endDate: Date;
      }
    }
    export namespace Response {
      export interface Dto {}
    }
  }
}
