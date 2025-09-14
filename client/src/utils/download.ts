export const download = {
  /**
   * Descarga un archivo con el contenido especificado
   */
  downloadFile(content: string, filename: string, contentType: string = 'text/plain'): void {
    // Crear un blob con el contenido
    const blob = new Blob([content], { type: contentType });
    
    // Crear una URL temporal para el blob
    const url = URL.createObjectURL(blob);
    
    // Crear un elemento 'a' temporal para la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    // Agregar el enlace al DOM, hacer clic y removerlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpiar la URL temporal
    URL.revokeObjectURL(url);
  },

  /**
   * Descarga una nota como archivo Markdown
   */
  downloadMarkdown(title: string, content: string): void {
    // Sanitizar el título para usar como nombre de archivo
    const sanitizedTitle = title
      .replace(/[<>:"/\\|?*]/g, '') // Remover caracteres no válidos para nombres de archivo
      .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
      .trim() || 'nota_sin_titulo';
    
    const filename = `${sanitizedTitle}.md`;
    
    // Crear el contenido completo del markdown con metadata opcional
    const markdownContent = `# ${title}\n\n${content}`;
    
    this.downloadFile(markdownContent, filename, 'text/markdown');
  },

  /**
   * Descarga una nota como archivo de texto plano
   */
  downloadText(title: string, content: string): void {
    const sanitizedTitle = title
      .replace(/[<>:"/\\|?*]/g, '')
      .replace(/\s+/g, '_')
      .trim() || 'nota_sin_titulo';
    
    const filename = `${sanitizedTitle}.txt`;
    
    // Crear contenido de texto plano (sin formato Markdown)
    const textContent = `${title}\n${'='.repeat(title.length)}\n\n${content}`;
    
    this.downloadFile(textContent, filename, 'text/plain');
  }
};