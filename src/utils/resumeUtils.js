import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPDF = async (elementId = 'resume-preview', filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Resume element not found');
    alert('Could not find the resume to export. Please try again.');
    return;
  }

  try {
    // Temporarily remove transform scale for capture
    const parent = element.parentElement;
    const originalTransform = parent?.style.transform || '';
    const originalTransformOrigin = parent?.style.transformOrigin || '';
    if (parent) {
      parent.style.transform = 'none';
      parent.style.transformOrigin = 'unset';
    }

    await new Promise((r) => setTimeout(r, 100)); // Let styles settle

    const canvas = await html2canvas(element, {
      scale: 3,           // High DPI for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      imageTimeout: 0,
      removeContainer: false,
    });

    // Restore transform
    if (parent) {
      parent.style.transform = originalTransform;
      parent.style.transformOrigin = originalTransformOrigin;
    }

    const imgData = canvas.toDataURL('image/png', 1.0);

    // A4: 210 x 297 mm
    const PDF_WIDTH_MM = 210;
    const PDF_HEIGHT_MM = 297;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false,
    });

    const canvasWidthPx = canvas.width;
    const canvasHeightPx = canvas.height;

    // Scale to fit A4 width exactly
    const scaleRatio = PDF_WIDTH_MM / canvasWidthPx;
    const imgHeightMM = canvasHeightPx * scaleRatio;

    // Handle multi-page if content exceeds A4 height
    let remainingHeight = imgHeightMM;
    let yOffset = 0;
    let page = 0;

    while (remainingHeight > 0) {
      if (page > 0) pdf.addPage();

      const sliceHeightMM = Math.min(PDF_HEIGHT_MM, remainingHeight);
      const sliceHeightPx = sliceHeightMM / scaleRatio;

      // Create a cropped canvas for this page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvasWidthPx;
      pageCanvas.height = Math.ceil(sliceHeightPx);
      const ctx = pageCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, yOffset, canvasWidthPx, Math.ceil(sliceHeightPx), 0, 0, canvasWidthPx, Math.ceil(sliceHeightPx));

      const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(pageImgData, 'PNG', 0, 0, PDF_WIDTH_MM, sliceHeightMM);

      yOffset += Math.ceil(sliceHeightPx);
      remainingHeight -= PDF_HEIGHT_MM;
      page++;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.\n\n' + error.message);
  }
};

export const generateShareableLink = (resumeData) => {
  try {
    // Omit the photo (too large for URL) before encoding
    const dataWithoutPhoto = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        photo: null,
      },
    };
    const jsonString = JSON.stringify(dataWithoutPhoto);
    const base64 = btoa(unescape(encodeURIComponent(jsonString)));
    const url = new URL(window.location.href);
    url.searchParams.set('resume', base64);
    return url.toString();
  } catch (e) {
    console.error('Share link generation failed:', e);
    return window.location.href;
  }
};

export const loadFromShareableLink = () => {
  try {
    const url = new URL(window.location.href);
    const resumeParam = url.searchParams.get('resume');
    if (!resumeParam) return null;
    const jsonString = decodeURIComponent(escape(atob(resumeParam)));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing shared resume:', error);
    return null;
  }
};
