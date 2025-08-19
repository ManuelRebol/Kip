import type { ComponentProps } from 'react';
import { markdownUtils } from '../../../utils/markdown';
import Styles from './MarkdownPreview.module.css';

interface MarkdownPreviewProps extends ComponentProps<'div'> {
  markdown: string;
  maxHeight?: string;
}

export const MarkdownPreview = ({ 
  markdown, 
  maxHeight,
  className,
  ...rest 
}: MarkdownPreviewProps) => {
  const html = markdownUtils.toHTMLSync(markdown);

  return (
    <div 
      {...rest}
      className={`${Styles.preview} ${className ?? ''}`}
      style={{ maxHeight }}
    >
      <div 
        className={Styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};