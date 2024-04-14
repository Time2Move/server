export interface Driving {
  id: string;
  userId: string;
  carId: string;
  rentalId: string | null;
}
export namespace Driving {
  export namespace Start {
    export namespace Request {
      export interface MyCarDto {
        type: 'MY_CAR';
        carId: string;
      }
      export interface RentCarDto {
        type: 'RENT_CAR';
        rentalId: string;
      }

      export type Dto = MyCarDto | RentCarDto;
    }
    export type ResponseDto = {
      id: string;
      carId: string;
      userId: string;
      status: 'ACTIVE' | 'END';
      createdAt: Date;
    };
  }
}
