import type { ComponentProps, ReactNode } from 'react';
import { Header } from '../Header/Header';
import type { User } from '../../../types';
import Styles from './Layout.module.css';

type LayoutVariant = 'default' | 'auth' | 'full';

type Props = ComponentProps<'div'> & {
  variant?: LayoutVariant;
  user?: User;
  onProfileEdit?: () => void;
  children: ReactNode;
};

export const Layout = ({ 
  variant = 'default',
  user,
  onProfileEdit,
  children,
  className, 
  ...rest 
}: Props) => {
  if (variant === 'auth') {
    return (
      <div className={Styles.authLayout}>
        <div className={Styles.authContent}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div {...rest} className={`${Styles.layout} ${className ?? ''}`}>
      <Header 
        user={user}
        onProfileEdit={onProfileEdit}
      />
      <main className={`${Styles.main} ${variant === 'full' ? Styles.mainFull : ''}`}>
        {children}
      </main>
    </div>
  );
};