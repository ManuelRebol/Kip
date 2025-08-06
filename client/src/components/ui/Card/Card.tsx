import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import Styles from './Card.module.css';

type Props = ComponentProps<'article'> & { 
  title?: ReactNode;
  footer?: ReactNode;
};

export const Card = ({ 
  title, 
  footer,
  children, 
  className, 
  ...rest 
}: PropsWithChildren<Props>) => (
  <article {...rest} className={`${Styles.card} ${className ?? ''}`}>
    {title && (
      <div className={Styles.header}>
        {typeof title === 'string' ? (
          <h2 className={Styles.title}>{title}</h2>
        ) : title}
      </div>
    )}
    <div className={Styles.content}>
      {children}
    </div>
    {footer && (
      <div className={Styles.footer}>
        {footer}
      </div>
    )}
  </article>
);