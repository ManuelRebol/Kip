import type { ComponentProps } from 'react';
import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import Styles from './MarkdownHelp.module.css';

interface MarkdownHelpProps extends ComponentProps<'div'> {
  isOpen: boolean;
  onClose: () => void;
}

export const MarkdownHelp = ({ 
  isOpen, 
  onClose,
  className,
  ...rest 
}: MarkdownHelpProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl+B', action: '**Negrita**', example: '**texto**' },
    { key: 'Ctrl+I', action: '*Cursiva*', example: '*texto*' },
    { key: 'Ctrl+`', action: 'Código inline', example: '`código`' },
    { key: 'Ctrl+K', action: 'Enlace', example: '[texto](url)' },
    { key: 'Ctrl+Shift+I', action: 'Imagen', example: '![alt](url)' },
    { key: 'Ctrl+1', action: 'Título 1', example: '# Título' },
    { key: 'Ctrl+2', action: 'Título 2', example: '## Título' },
    { key: 'Ctrl+3', action: 'Título 3', example: '### Título' },
    { key: 'Ctrl+Shift+8', action: 'Lista con viñetas', example: '- Item' },
    { key: 'Ctrl+Shift+7', action: 'Lista numerada', example: '1. Item' },
    { key: 'Ctrl+Shift+9', action: 'Cita', example: '> Cita' },
    { key: 'Ctrl+M', action: 'Fórmula matemática', example: '$x^2$' },
    { key: 'Tab', action: 'Indentación', example: '  texto' },
  ];

  const examples = [
    {
      title: 'Formato de texto',
      items: [
        '**Negrita** y *cursiva*',
        '~~Tachado~~',
        '`código inline`',
        'Texto^superíndice^ y ~subíndice~'
      ]
    },
    {
      title: 'Títulos',
      items: [
        '# Título principal',
        '## Subtítulo',
        '### Título de sección'
      ]
    },
    {
      title: 'Listas',
      items: [
        '- Lista con viñetas',
        '1. Lista numerada',
        '- [ ] Lista de tareas'
      ]
    },
    {
      title: 'Enlaces e imágenes',
      items: [
        '[Texto del enlace](https://ejemplo.com)',
        '![Descripción de imagen](url-imagen)',
        'https://enlace-automático.com'
      ]
    },
    {
      title: 'Código',
      items: [
        '```javascript',
        'console.log("Hola mundo");',
        '```'
      ]
    },
    {
      title: 'Matemáticas (LaTeX)',
      items: [
        '$x^2 + y^2 = z^2$ (inline)',
        '$$\\frac{a}{b} = \\sqrt{c}$$ (bloque)',
        '$\\sum_{i=1}^{n} x_i$'
      ]
    },
    {
      title: 'Otros',
      items: [
        '> Cita o nota importante',
        '---',
        '| Col1 | Col2 |',
        '|------|------|',
        '| A    | B    |'
      ]
    }
  ];

  return (
    <div className={Styles.overlay} onClick={onClose}>
      <div 
        {...rest}
        className={`${Styles.helpModal} ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={Styles.header}>
          <h2 className={Styles.title}>
            <HelpCircle size={20} />
            Guía de Markdown
          </h2>
          <Button
            variant="ghost"
            size="small"
            onClick={onClose}
            className={Styles.closeButton}
          >
            <X size={16} />
          </Button>
        </div>

        <div className={Styles.content}>
          <div className={Styles.section}>
            <h3 className={Styles.sectionTitle}>Atajos de teclado</h3>
            <div className={Styles.shortcutsList}>
              {shortcuts.map((shortcut, index) => (
                <div key={index} className={Styles.shortcutItem}>
                  <kbd className={Styles.kbd}>{shortcut.key}</kbd>
                  <span className={Styles.action}>{shortcut.action}</span>
                  <code className={Styles.example}>{shortcut.example}</code>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.section}>
            <h3 className={Styles.sectionTitle}>Sintaxis Markdown</h3>
            <div className={Styles.examplesGrid}>
              {examples.map((category, index) => (
                <div key={index} className={Styles.exampleCategory}>
                  <h4 className={Styles.categoryTitle}>{category.title}</h4>
                  <div className={Styles.exampleItems}>
                    {category.items.map((item, itemIndex) => (
                      <code key={itemIndex} className={Styles.exampleCode}>
                        {item}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente del botón de ayuda
export const MarkdownHelpButton = ({ className, ...rest }: ComponentProps<'button'>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        {...rest}
        className={`${Styles.helpButton} ${className ?? ''}`}
        onClick={() => setIsOpen(true)}
        title="Ver ayuda de Markdown (F1)"
      >
        <HelpCircle size={16} />
      </button>
      <MarkdownHelp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};