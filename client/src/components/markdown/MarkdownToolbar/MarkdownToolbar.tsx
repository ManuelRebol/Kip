import type { ComponentProps } from 'react';
import { 
  Bold, 
  Italic, 
  Code, 
  Link, 
  Image, 
  List, 
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Calculator,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import { MarkdownHelpButton } from '../MarkdownHelp/MarkdownHelp';
import Styles from './MarkdownToolbar.module.css';

interface MarkdownToolbarProps extends ComponentProps<'div'> {
  onFormat: (format: string) => void;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const MarkdownToolbar = ({ 
  onFormat, 
  showPreview, 
  onTogglePreview,
  className,
  ...rest 
}: MarkdownToolbarProps) => {
  const formatButtons = [
    { 
      icon: <Bold size={16} />, 
      format: 'bold', 
      title: 'Negrita (Ctrl+B)',
      shortcut: 'Ctrl+B'
    },
    { 
      icon: <Italic size={16} />, 
      format: 'italic', 
      title: 'Cursiva (Ctrl+I)',
      shortcut: 'Ctrl+I'
    },
    { 
      icon: <Code size={16} />, 
      format: 'code', 
      title: 'Código inline (Ctrl+`)',
      shortcut: 'Ctrl+`'
    },
    { 
      icon: <Link size={16} />, 
      format: 'link', 
      title: 'Enlace (Ctrl+K)',
      shortcut: 'Ctrl+K'
    },
    { 
      icon: <Image size={16} />, 
      format: 'image', 
      title: 'Imagen (Ctrl+Shift+I)',
      shortcut: 'Ctrl+Shift+I'
    },
    { 
      icon: <Heading1 size={16} />, 
      format: 'h1', 
      title: 'Título 1 (Ctrl+1)',
      shortcut: 'Ctrl+1'
    },
    { 
      icon: <Heading2 size={16} />, 
      format: 'h2', 
      title: 'Título 2 (Ctrl+2)',
      shortcut: 'Ctrl+2'
    },
    { 
      icon: <Heading3 size={16} />, 
      format: 'h3', 
      title: 'Título 3 (Ctrl+3)',
      shortcut: 'Ctrl+3'
    },
    { 
      icon: <List size={16} />, 
      format: 'ul', 
      title: 'Lista con viñetas (Ctrl+Shift+8)',
      shortcut: 'Ctrl+Shift+8'
    },
    { 
      icon: <ListOrdered size={16} />, 
      format: 'ol', 
      title: 'Lista numerada (Ctrl+Shift+7)',
      shortcut: 'Ctrl+Shift+7'
    },
    { 
      icon: <Quote size={16} />, 
      format: 'quote', 
      title: 'Cita (Ctrl+Shift+9)',
      shortcut: 'Ctrl+Shift+9'
    },
    { 
      icon: <Calculator size={16} />, 
      format: 'math', 
      title: 'Fórmula matemática (Ctrl+M)',
      shortcut: 'Ctrl+M'
    },
  ];

  return (
    <div {...rest} className={`${Styles.toolbar} ${className ?? ''}`}>
      <div className={Styles.formatButtons}>
        {formatButtons.map((button) => (
          <Button
            key={button.format}
            variant="ghost"
            size="small"
            onClick={() => onFormat(button.format)}
            title={button.title}
            className={Styles.toolbarButton}
          >
            {button.icon}
          </Button>
        ))}
      </div>
      
      <div className={Styles.rightSection}>
        <MarkdownHelpButton className={Styles.helpButton} />
        
        <div className={Styles.viewToggle}>
          <Button
            variant={showPreview ? "primary" : "ghost"}
            size="small"
            onClick={onTogglePreview}
            title={showPreview ? 'Ocultar vista previa' : 'Mostrar vista previa'}
            className={Styles.previewToggle}
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Editor' : 'Vista previa'}
          </Button>
        </div>
      </div>
    </div>
  );
};