export interface Rental {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export namespace Rental {
  export type Status = 'REQUEST' | 'ACCEPT' | 'REJECT' | 'CANCEL' | 'COMPLETE';

  export namespace SendRequest {
    export namespace Request {
      export interface Dto {
        userId: string;
        carId: string;
        startDate: Date;
        endDate: Date;
      }
    }

    export namespace Response {
      export interface Dto {
        id: string;
        carId: string;
        userId: string;
        startDate: Date;
        endDate: Date;
        status: Status;
      }
    }
  }

  export namespace Update {
    export namespace Request {
      export interface Dto {
        status: Status;
      }
    }
    export namespace Response {
      export interface Dto {
        id: string;
        carId: string;
        userId: string;
        startDate: Date;
        endDate: Date;
        status: Status;
      }
    }
  }
}
