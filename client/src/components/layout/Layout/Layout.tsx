import type { ComponentProps, ReactNode } from 'react';
import { Header } from '../Header/Header';
import type { User } from '../../../types';
import Styles from './Layout.module.css';

type LayoutVariant = 'default' | 'auth' | 'full';

type Props = ComponentProps<'div'> & {
  variant?: LayoutVariant;
  user?: User;
  children: ReactNode;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

export const Layout = ({ 
  variant = 'default',
  user,
  children,
  onMenuClick,
  showMenuButton = false,
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
        onMenuClick={onMenuClick}
        showMenuButton={showMenuButton}
      />
      <main className={`${Styles.main} ${variant === 'full' ? Styles.mainFull : ''}`}>
        {children}
      </main>
    </div>
  );
};