import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPDF = async (elementId = 'resume-preview', filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Resume element not found:', elementId);
    alert('Export Error: Could not find the resume container. Please try refreshing.');
    return;
  }

  try {
    console.log('PDF: Starting high-fidelity capture...');
    
    // Allow any pending React/Framer renders to settle
    await new Promise(r => setTimeout(r, 450));

    const canvas = await html2canvas(element, {
      scale: 2, // 2x is plenty for high quality without crashing memory
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Enforce scale 1 on the clone specifically for capture
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.transformOrigin = 'unset';
          clonedElement.style.width = '210mm';
        }
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    console.log('PDF Downloaded successfully');
  } catch (error) {
    console.error('CRITICAL: PDF Generation failed', error);
    alert('Oops! We encountered an error generating your PDF. Please try a different browser or check your internet connection.');
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
