import { Base } from '..';

export namespace Auth {
  export type OauthType = 'KAKAO' | 'GOOGLE' | 'NAVER';
  export type LocalType = 'LOCAL';
  export type LoginType = OauthType | LocalType;

  //----------------------------------------
  // CheckLogin
  //----------------------------------------
  export namespace CheckLogin {
    export namespace Request {
      export interface Header {
        authorization: string;
      }
    }

    export namespace Response {
      export interface Dto {
        isLogin: boolean;
      }
    }

    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  //----------------------------------------
  // Login
  //----------------------------------------
  export namespace Login {
    export namespace Request {
      export interface OauthDto {
        type: OauthType;
        accessToken: string;
      }

      export interface LocalDto {
        type: LocalType;
        account: string;
        password: string;
      }

      export type Dto = OauthDto | LocalDto;
    }
    export namespace Response {
      export interface Dto {
        accessToken: string;
        userId: string;
      }
    }
  }

  //----------------------------------------
  // Logout
  //----------------------------------------
  export namespace Logout {
    export namespace Request {
      export interface Header {
        authorization: string;
      }
    }
    export namespace Response {
      export interface Dto {
        isLogout: false;
      }
    }

    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  //----------------------------------------
  // RefreshToken
  //----------------------------------------
  export namespace RefreshToken {
    export namespace Request {
      export type Header = {
        Authorization: string;
      };
    }
    export namespace Response {
      export interface Dto {
        accessToken: string;
        userId: string;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  //----------------------------------------
  // signUp (회원가입)
  //----------------------------------------
  export namespace Signup {
    export namespace Request {
      export interface OauthDto {
        type: OauthType;
        accessToken: string;
      }

      export interface LocalDto {
        type: LocalType;
        account: string;
        password: string;
        certificationId: string;
        phone: string;
        contryCode: string;
      }

      export type Dto = OauthDto | LocalDto;
    }

    export namespace Response {
      export interface Dto {
        userId: string;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  //----------------------------------------
  // ValidateCertification
  //----------------------------------------
  export namespace ValidateCertification {
    export namespace Request {
      export interface Dto {
        certificationId: string;
        phone: string;
      }
    }

    export namespace Response {
      export interface Dto {
        isCertification: boolean;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  export namespace ChangePassword {
    export namespace Request {
      export interface Dto {
        password: string;
        newPassword: string;
        type: 'FIND_PASSWORD' | 'PROFILE';
      }
    }

    export namespace Response {
      export interface Dto {
        userId: string;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  export namespace RequsetCertificationCode {
    export type TargetType = 'PHONE' | 'EMAIL';
    export type Type = 'SIGN_UP' | 'FIND_PASSWORD';
    export namespace Request {
      export type Dto = PhoneDto;
      export interface PhoneDto {
        target: string; // phone number (ex: 01012345678)
        contryCode: string; // country code (ex: +82)
        targetType: 'PHONE';
        type: Type;
      }

      // 현재는 사용하지 않음
      export interface EmailDto {
        target: string; // email address
        targetType: 'EMAIL';
        type: Type;
      }
    }

    export namespace Response {
      export interface Dto {
        isSuccess: boolean;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  export namespace ValidateCertificationCode {
    export type TargetType = 'PHONE' | 'EMAIL';
    export type Type = 'SIGN_UP' | 'FIND_PASSWORD';
    export namespace Request {
      export interface PhoneDto {
        target: string;
        contryCode: string;
        code: string;
        targetType: 'PHONE';
        type: 'SIGN_UP' | 'FIND_PASSWORD';
      }
      export interface EmailDto {
        target: string;
        code: string;
        targetType: 'EMAIL';
        type: 'SIGN_UP' | 'FIND_PASSWORD';
      }

      export type Dto = PhoneDto | EmailDto;
    }

    export namespace Response {
      export interface Dto {
        certificationId: string;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }
}
