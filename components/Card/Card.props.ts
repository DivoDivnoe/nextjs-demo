import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReactNode } from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'white' | 'blue';
  children?: ReactNode;
}
