// export type UserMenu = {
//   display: string[];
//   route: string[]
// }

// export type AdminMenu = {
//   display: string[];
//   route: string[];
// };
export type HeaderProps = {
  menu: {
    display: string[];
    route: string[];
  };
  title?: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  styles: any;
  isUser: boolean;
};
