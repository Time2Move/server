import { Base } from '..';

export namespace Auth {
  export type OauthType = 'kakao' | 'google' | 'naver';
  export type LocalType = 'local';
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
  export namespace SignUp {
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
      }

      export interface Dto {
        account: string;
        password: string;
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

  //----------------------------------------
  // CheckCertification
  //----------------------------------------
  export namespace CheckCertification {
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
    export namespace Request {
      export interface Dto {
        phone: string;
      }
    }

    export namespace Response {
      export interface Dto {
        success: boolean;
      }
    }
    export type SUCCESS = Base.SUCCESS<Response.Dto>;
    export type Response = SUCCESS;
  }

  export namespace CheckCertificationCode {
    export namespace Request {
      export interface Dto {
        phone: string;
        code: string;
      }
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
