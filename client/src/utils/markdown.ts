import { Marked, Renderer } from 'marked'
import type { Tokens } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import katex from 'katex'
import DOMPurify from 'dompurify'

// Crear instancia de Marked con highlight
const marked = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext'
            return hljs.highlight(code, { language }).value
        },
    })
)

// Configurar marked con las opciones necesarias
marked.setOptions({
    breaks: true,
    gfm: true,
})

// Custom renderer para soportar LaTeX
const renderer = new Renderer()

// Override del método de texto para manejar LaTeX
const originalText = renderer.text.bind(renderer)

renderer.text = function (token: Tokens.Text | Tokens.Escape): string {
    let text = token.text

    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, math) => {
        try {
            return `<div class="math-block">${katex.renderToString(math, {
                displayMode: true,
            })}</div>`
        } catch (e) {
            console.error('Error rendering LaTeX (block):', e)
            return `<div class="math-error">Error en fórmula: ${DOMPurify.sanitize(
                math
            )}</div>`
        }
    })

    text = text.replace(/\$([^$\n]+?)\$/g, (_m, math) => {
        try {
            return `<span class="math-inline">${katex.renderToString(math, {
                displayMode: false,
            })}</span>`
        } catch (e) {
            console.error('Error rendering LaTeX (inline):', e)
            return `<span class="math-error">Error: ${DOMPurify.sanitize(
                math
            )}</span>`
        }
    })

    return originalText({ ...token, text })
}

// Configurar el renderer personalizado
marked.use({ renderer })

export const markdownUtils = {
    /**
     * Convierte Markdown a HTML
     */
    toHTML: async (markdown: string): Promise<string> => {
        if (!markdown) return ''

        try {
            const html = await marked.parse(markdown)

            // Sanitizar el HTML para prevenir XSS
            return DOMPurify.sanitize(html, {
                ADD_ATTR: ['style'],
                ADD_TAGS: [
                    'math',
                    'semantics',
                    'annotation',
                    'annotation-xml',
                    'mrow',
                    'mi',
                    'mn',
                    'mo',
                    'msup',
                    'msub',
                    'mfrac',
                ],
                ALLOWED_TAGS: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'p',
                    'br',
                    'strong',
                    'em',
                    'u',
                    's',
                    'del',
                    'a',
                    'img',
                    'video',
                    'audio',
                    'ul',
                    'ol',
                    'li',
                    'blockquote',
                    'code',
                    'pre',
                    'table',
                    'thead',
                    'tbody',
                    'tr',
                    'th',
                    'td',
                    'div',
                    'span',
                    'sub',
                    'sup',
                ],
                ALLOWED_ATTR: [
                    'href',
                    'src',
                    'alt',
                    'title',
                    'target',
                    'rel',
                    'class',
                    'id',
                    'width',
                    'height',
                    'controls',
                    'autoplay',
                    'loop',
                    'muted',
                ],
                ALLOWED_URI_REGEXP:
                    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.]+(?:[^a-z+.\-:]|$))/i,
            })
        } catch (error) {
            console.error('Error parsing markdown:', error)
            return markdown
        }
    },

    /**
     * Convierte Markdown a HTML de forma síncrona para componentes
     */
    toHTMLSync: (markdown: string): string => {
        if (!markdown) return ''

        try {
            // Para evitar problemas con async en componentes React, procesamos LaTeX primero
            let processedMarkdown = markdown

            // Procesar fórmulas LaTeX antes del parsing
            processedMarkdown = processedMarkdown.replace(
                /\$\$([\s\S]+?)\$\$/g,
                (_m, math) => {
                    try {
                        return `<div class="math-block">${katex.renderToString(
                            math,
                            { displayMode: true }
                        )}</div>`
                    } catch (e) {
                        console.error(
                            'Error rendering LaTeX (block preprocess):',
                            e
                        )
                        return `<div class="math-error">Error en fórmula: ${math}</div>`
                    }
                }
            )

            processedMarkdown = processedMarkdown.replace(
                /\$([^$\n]+?)\$/g,
                (_m, math) => {
                    try {
                        return `<span class="math-inline">${katex.renderToString(
                            math,
                            { displayMode: false }
                        )}</span>`
                    } catch (e) {
                        console.error(
                            'Error rendering LaTeX (inline preprocess):',
                            e
                        )
                        return `<span class="math-error">Error: ${math}</span>`
                    }
                }
            )

            // Crear una instancia temporal sin el renderer de texto personalizado
            const tempMarked = new Marked(
                markedHighlight({
                    emptyLangClass: 'hljs',
                    langPrefix: 'hljs language-',
                    highlight(code, lang) {
                        const language = hljs.getLanguage(lang)
                            ? lang
                            : 'plaintext'
                        return hljs.highlight(code, { language }).value
                    },
                })
            )

            tempMarked.setOptions({
                breaks: true,
                gfm: true,
            })

            const html = tempMarked.parse(processedMarkdown) as string

            return DOMPurify.sanitize(html, {
                ADD_ATTR: ['style'], // permite inline styles que KaTeX usa
                ADD_TAGS: [
                    'math',
                    'semantics',
                    'annotation',
                    'annotation-xml',
                    'mrow',
                    'mi',
                    'mn',
                    'mo',
                    'msup',
                    'msub',
                    'mfrac',
                ],
                ALLOWED_TAGS: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'p',
                    'br',
                    'strong',
                    'em',
                    'u',
                    's',
                    'del',
                    'a',
                    'img',
                    'video',
                    'audio',
                    'ul',
                    'ol',
                    'li',
                    'blockquote',
                    'code',
                    'pre',
                    'table',
                    'thead',
                    'tbody',
                    'tr',
                    'th',
                    'td',
                    'div',
                    'span',
                    'sub',
                    'sup',
                ],
                ALLOWED_ATTR: [
                    'href',
                    'src',
                    'alt',
                    'title',
                    'target',
                    'rel',
                    'class',
                    'id',
                    'width',
                    'height',
                    'controls',
                    'autoplay',
                    'loop',
                    'muted',
                ],
                ALLOWED_URI_REGEXP:
                    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.]+(?:[^a-z+.\-:]|$))/i,
            })
        } catch (error) {
            console.error('Error parsing markdown sync:', error)
            return markdown
        }
    },

    /**
     * Extrae texto plano del Markdown para las previews
     */
    toPlainText: (markdown: string): string => {
        if (!markdown) return ''

        return (
            markdown
                // Remover fórmulas LaTeX
                .replace(/\$\$(.+?)\$\$/g, '[Fórmula]')
                .replace(/\$([^$]+)\$/g, '[Fórmula]')
                // Remover enlaces pero mantener el texto
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                // Remover imágenes
                .replace(/!\[([^\]]*)\]\([^)]+\)/g, '[Imagen: $1]')
                // Remover headers
                .replace(/^#{1,6}\s+/gm, '')
                // Remover énfasis
                .replace(/(\*\*|__)(.*?)\1/g, '$2')
                .replace(/(\*|_)(.*?)\1/g, '$2')
                // Remover código
                .replace(/`([^`]+)`/g, '$1')
                .replace(/```[\s\S]*?```/g, '[Código]')
                // Remover blockquotes
                .replace(/^>\s+/gm, '')
                // Remover listas
                .replace(/^[\s]*[-*+]\s+/gm, '• ')
                .replace(/^[\s]*\d+\.\s+/gm, '')
                // Limpiar espacios extra
                .replace(/\n\s*\n/g, '\n')
                .trim()
        )
    },

    /**
     * Obtiene el primer párrafo para preview en cards
     */
    getPreview: (markdown: string, maxLength: number = 150): string => {
        const plainText = markdownUtils.toPlainText(markdown)
        const firstParagraph = plainText.split('\n')[0]

        if (firstParagraph.length <= maxLength) {
            return firstParagraph
        }

        return firstParagraph.substring(0, maxLength).trim() + '...'
    },

    /**
     * Inserta formato Markdown en una posición específica
     */
    insertFormat: (
        text: string,
        start: number,
        end: number,
        format: string
    ): { text: string; newStart: number; newEnd: number } => {
        const beforeSelection = text.substring(0, start)
        const selection = text.substring(start, end)
        const afterSelection = text.substring(end)

        let formattedText: string
        let newStart: number
        let newEnd: number

        switch (format) {
            case 'bold':
                formattedText = selection
                    ? `**${selection}**`
                    : '**texto en negrita**'
                newStart = start + (selection ? 2 : 2)
                newEnd = start + (selection ? selection.length + 4 : 18)
                break

            case 'italic':
                formattedText = selection
                    ? `*${selection}*`
                    : '*texto en cursiva*'
                newStart = start + (selection ? 1 : 1)
                newEnd = start + (selection ? selection.length + 2 : 17)
                break

            case 'code':
                formattedText = selection ? `\`${selection}\`` : '`código`'
                newStart = start + (selection ? 1 : 1)
                newEnd = start + (selection ? selection.length + 2 : 7)
                break

            case 'link':
                formattedText = selection
                    ? `[${selection}](url)`
                    : '[texto del enlace](url)'
                newStart = start + (selection ? selection.length + 3 : 20)
                newEnd = start + (selection ? selection.length + 6 : 23)
                break

            case 'image':
                formattedText = selection
                    ? `![${selection}](url)`
                    : '![descripción](url)'
                newStart = start + (selection ? selection.length + 4 : 15)
                newEnd = start + (selection ? selection.length + 7 : 18)
                break

            case 'h1':
                formattedText = selection ? `# ${selection}` : '# Título 1'
                newStart = start + (selection ? 2 : 2)
                newEnd = start + (selection ? selection.length + 2 : 10)
                break

            case 'h2':
                formattedText = selection ? `## ${selection}` : '## Título 2'
                newStart = start + (selection ? 3 : 3)
                newEnd = start + (selection ? selection.length + 3 : 12)
                break

            case 'h3':
                formattedText = selection ? `### ${selection}` : '### Título 3'
                newStart = start + (selection ? 4 : 4)
                newEnd = start + (selection ? selection.length + 4 : 14)
                break

            case 'ul':
                formattedText = selection
                    ? `- ${selection}`
                    : '- Elemento de lista'
                newStart = start + (selection ? 2 : 2)
                newEnd = start + (selection ? selection.length + 2 : 19)
                break

            case 'ol':
                formattedText = selection
                    ? `1. ${selection}`
                    : '1. Elemento de lista'
                newStart = start + (selection ? 3 : 3)
                newEnd = start + (selection ? selection.length + 3 : 21)
                break

            case 'quote':
                formattedText = selection ? `> ${selection}` : '> Cita'
                newStart = start + (selection ? 2 : 2)
                newEnd = start + (selection ? selection.length + 2 : 6)
                break

            case 'math':
                formattedText = selection ? `${selection}` : '$x^2 + y^2 = z^2'
                newStart = start + (selection ? 1 : 1)
                newEnd = start + (selection ? selection.length + 2 : 16)
                break

            case 'mathBlock':
                formattedText = selection
                    ? `$\n${selection}\n$`
                    : '$\nx^2 + y^2 = z^2\n$'
                newStart = start + (selection ? 3 : 3)
                newEnd = start + (selection ? selection.length + 4 : 18)
                break

            default:
                formattedText = selection
                newStart = start
                newEnd = end
        }

        return {
            text: beforeSelection + formattedText + afterSelection,
            newStart,
            newEnd,
        }
    },
}

export default markdownUtils
