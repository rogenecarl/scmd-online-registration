import { ReactNode } from "react";

export enum UserRole {
  USER = 'USER',
  PRESIDENT = 'PRESIDENT'
}

export interface RoleFeature {
  icon: ReactNode;
  text: string;
}

export interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  href: string;
  features: RoleFeature[];
  visualIcon: ReactNode;
  primaryColor: string;
  buttonText: string;
}