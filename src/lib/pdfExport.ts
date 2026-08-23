export const exportResumeToPDF = (elementId: string, filename: string) => {
  const resumeElement = document.getElementById(elementId);
  if (!resumeElement) {
    console.error('Resume element not found');
    return;
  }

  // Get the HTML content of the resume
  const content = resumeElement.innerHTML;

  // Find all stylesheets in the current document to apply them to the iframe
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('');
      } catch (e) {
        // Cross-origin stylesheet access error (ignore)
        return '';
      }
    })
    .join('\n');

  // Specific print styles to guarantee A4 layout and hide anything else
  const printStyles = `
    @page {
      size: A4 portrait;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background-color: white !important;
    }
    /* Ensure the resume fills the A4 page correctly */
    .resume-a4-container {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      transform: none !important;
      overflow: visible !important;
    }
    /* Hide scrollbars or builder UI if they accidentally get in */
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  // Create a hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow?.document;
  if (!iframeDoc) {
    console.error('Iframe document not found');
    document.body.removeChild(iframe);
    return;
  }

  // Build the complete HTML for the iframe
  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${filename}</title>
        <meta charset="utf-8">
        <style>${styles}</style>
        <style>${printStyles}</style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
  iframeDoc.close();

  // Wait for fonts and styles to render, then print
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};
