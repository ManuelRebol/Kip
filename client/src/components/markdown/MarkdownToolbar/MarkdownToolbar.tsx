import type { ComponentProps } from 'react';
import { useState } from 'react';
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
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import { MarkdownHelpButton } from '../MarkdownHelp/MarkdownHelp';
import Styles from './MarkdownToolbar.module.css';

interface MarkdownToolbarProps extends ComponentProps<'div'> {
  onFormat: (format: string) => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: (collapsed: boolean) => void;
}

export const MarkdownToolbar = ({ 
  onFormat, 
  showPreview, 
  onTogglePreview,
  collapsed: controlledCollapsed,
  onToggleCollapsed,
  className,
  ...rest 
}: MarkdownToolbarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  // Usar controlled o uncontrolled state
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const setCollapsed = onToggleCollapsed || setInternalCollapsed;

  const formatButtons = [
    { 
      icon: <Bold size={16} />, 
      format: 'bold', 
      title: 'Negrita (Ctrl+B)',
      priority: 1
    },
    { 
      icon: <Italic size={16} />, 
      format: 'italic', 
      title: 'Cursiva (Ctrl+I)',
      priority: 1
    },
    { 
      icon: <Code size={16} />, 
      format: 'code', 
      title: 'Código inline (Ctrl+`)',
      priority: 2
    },
    { 
      icon: <Heading1 size={16} />, 
      format: 'h1', 
      title: 'Título 1 (Ctrl+1)',
      priority: 2
    },
    { 
      icon: <Heading2 size={16} />, 
      format: 'h2', 
      title: 'Título 2 (Ctrl+2)',
      priority: 3
    },
    { 
      icon: <Heading3 size={16} />, 
      format: 'h3', 
      title: 'Título 3 (Ctrl+3)',
      priority: 3
    },
    { 
      icon: <Link size={16} />, 
      format: 'link', 
      title: 'Enlace (Ctrl+K)',
      priority: 2
    },
    { 
      icon: <Image size={16} />, 
      format: 'image', 
      title: 'Imagen (Ctrl+Shift+I)',
      priority: 3
    },
    { 
      icon: <List size={16} />, 
      format: 'ul', 
      title: 'Lista con viñetas (Ctrl+Shift+8)',
      priority: 2
    },
    { 
      icon: <ListOrdered size={16} />, 
      format: 'ol', 
      title: 'Lista numerada (Ctrl+Shift+7)',
      priority: 3
    },
    { 
      icon: <Quote size={16} />, 
      format: 'quote', 
      title: 'Cita (Ctrl+Shift+9)',
      priority: 3
    },
    { 
      icon: <Calculator size={16} />, 
      format: 'math', 
      title: 'Fórmula matemática (Ctrl+M)',
      priority: 3
    },
  ];

  // Filtrar botones según prioridad en modo collapsed
  const visibleButtons = collapsed 
    ? formatButtons.filter(btn => btn.priority === 1)
    : formatButtons;

  const hiddenButtons = collapsed 
    ? formatButtons.filter(btn => btn.priority > 1)
    : [];

  return (
    <div {...rest} className={`${Styles.toolbar} ${collapsed ? Styles.collapsed : ''} ${className ?? ''}`}>
      <div className={Styles.toolbarHeader}>
        <div className={Styles.formatButtons}>
          {visibleButtons.map((button) => (
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
          
          {collapsed && hiddenButtons.length > 0 && (
            <div className={Styles.hiddenButtonsIndicator}>
              <span title={`+${hiddenButtons.length} más herramientas`}>
                +{hiddenButtons.length}
              </span>
            </div>
          )}
        </div>
        
        <div className={Styles.rightSection}>
          <MarkdownHelpButton className={Styles.helpButton} />
          
          <Button
            variant="ghost"
            size="small"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expandir toolbar' : 'Contraer toolbar'}
            className={Styles.collapseButton}
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </Button>
          
          <div className={Styles.viewToggle}>
            <Button
              variant={showPreview ? "primary" : "ghost"}
              size="small"
              onClick={onTogglePreview}
              title={showPreview ? 'Ocultar vista previa' : 'Mostrar vista previa'}
              className={Styles.previewToggle}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              <span className={Styles.previewToggleText}>
                {showPreview ? 'Editor' : 'Vista previa'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Panel expandido con todos los botones organizados */}
      {!collapsed && (
        <div className={Styles.expandedPanel}>
          <div className={Styles.buttonGroup}>
            <span className={Styles.groupLabel}>Formato</span>
            <div className={Styles.groupButtons}>
              {formatButtons.filter(btn => ['bold', 'italic', 'code'].includes(btn.format)).map((button) => (
                <Button
                  key={`expanded-${button.format}`}
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
          </div>

          <div className={Styles.buttonGroup}>
            <span className={Styles.groupLabel}>Títulos</span>
            <div className={Styles.groupButtons}>
              {formatButtons.filter(btn => ['h1', 'h2', 'h3'].includes(btn.format)).map((button) => (
                <Button
                  key={`expanded-${button.format}`}
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
          </div>

          <div className={Styles.buttonGroup}>
            <span className={Styles.groupLabel}>Contenido</span>
            <div className={Styles.groupButtons}>
              {formatButtons.filter(btn => ['link', 'image', 'ul', 'ol', 'quote', 'math'].includes(btn.format)).map((button) => (
                <Button
                  key={`expanded-${button.format}`}
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
          </div>
        </div>
      )}
    </div>
  );
};