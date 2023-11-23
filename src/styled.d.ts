// import original module declarations
import "styled-components";

// 💡 styled componenets의 테마 정의 확장
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}
