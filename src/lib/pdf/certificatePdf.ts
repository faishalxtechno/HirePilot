import { jsPDF } from 'jspdf';
import { InterviewReport, Interview, UserProfile } from '../../types';
import { loadImageAsBase64 } from './pdfHelpers';

export interface CertificatePdfData {
  report: InterviewReport;
  interview?: Interview;
  userProfile?: UserProfile | null;
  candidateName: string;
  role: string;
  interviewDate: string;
  certificateId: string;
  overallScore: number;
  avatarUrl?: string;
}

export async function generateCertificatePdf(data: CertificatePdfData): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 12;

  // ---------------------------------------------------------------------------
  // 1. Certificate Background & Outer Border
  // ---------------------------------------------------------------------------
  // Clean parchment / slate-50 background
  doc.setFillColor(253, 254, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer border (Dark Slate)
  doc.setDrawColor(15, 23, 42); // slate-900
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  // Inner border (Brand Indigo / Gold accent)
  doc.setDrawColor(79, 70, 229); // brand-600
  doc.setLineWidth(0.6);
  doc.rect(margin + 2.5, margin + 2.5, pageWidth - margin * 2 - 5, pageHeight - margin * 2 - 5);

  // Corner Accent Diamonds
  const corners = [
    { x: margin + 2.5, y: margin + 2.5 },
    { x: pageWidth - margin - 2.5, y: margin + 2.5 },
    { x: margin + 2.5, y: pageHeight - margin - 2.5 },
    { x: pageWidth - margin - 2.5, y: pageHeight - margin - 2.5 },
  ];

  doc.setFillColor(79, 70, 229);
  corners.forEach((c) => {
    doc.circle(c.x, c.y, 2, 'F');
  });

  // ---------------------------------------------------------------------------
  // 2. Top Header & Branding
  // ---------------------------------------------------------------------------
  // Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('HIREPILOT', pageWidth / 2, 30, { align: 'center' });

  // Ribbon / Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(79, 70, 229); // brand-600
  doc.text('AI-POWERED INTERVIEW ASSESSMENT', pageWidth / 2, 36, { align: 'center' });

  // Thin separator
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - 35, 39, pageWidth / 2 + 35, 39);

  // ---------------------------------------------------------------------------
  // 3. Certificate Title & Presentation Statement
  // ---------------------------------------------------------------------------
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text('CERTIFICATE OF INTERVIEW COMPLETION', pageWidth / 2, 51, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('This certificate is proudly presented to', pageWidth / 2, 60, { align: 'center' });

  // ---------------------------------------------------------------------------
  // 4. Candidate Name (DYNAMIC & PROMINENT)
  // ---------------------------------------------------------------------------
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(26);
  doc.setTextColor(79, 70, 229); // brand-600
  doc.text(data.candidateName, pageWidth / 2, 73, { align: 'center' });

  // Name underline
  doc.setDrawColor(99, 102, 241); // brand-500
  doc.setLineWidth(0.6);
  const nameWidth = Math.min(140, Math.max(70, data.candidateName.length * 5.5));
  doc.line(pageWidth / 2 - nameWidth / 2, 76, pageWidth / 2 + nameWidth / 2, 76);

  // Completion statement
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(
    'for successfully completing an AI-powered interview assessment on HirePilot, demonstrating',
    pageWidth / 2,
    84,
    { align: 'center' }
  );
  doc.text(
    `professional technical competence and comprehensive domain understanding for the role of`,
    pageWidth / 2,
    90,
    { align: 'center' }
  );

  // Role in bold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(data.role, pageWidth / 2, 98, { align: 'center' });

  // ---------------------------------------------------------------------------
  // 5. Candidate Profile Photo & Key Stats Card
  // ---------------------------------------------------------------------------
  const cardY = 106;
  const cardWidth = 210;
  const cardHeight = 36;
  const cardX = (pageWidth - cardWidth) / 2;

  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, 'FD');

  // Candidate Avatar Image
  const avatarImage = await loadImageAsBase64(data.avatarUrl);
  const avatarSize = 24;
  const avatarX = cardX + 8;
  const avatarY = cardY + 6;

  if (avatarImage) {
    try {
      doc.addImage(avatarImage.dataUrl, avatarImage.format, avatarX, avatarY, avatarSize, avatarSize);
    } catch (e) {
      drawCertificateAvatarFallback(doc, avatarX, avatarY, avatarSize, data.candidateName);
    }
  } else {
    drawCertificateAvatarFallback(doc, avatarX, avatarY, avatarSize, data.candidateName);
  }

  // Candidate Card Info
  const infoX = avatarX + avatarSize + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(data.candidateName, infoX, cardY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Role: ${data.role}`, infoX, cardY + 20);
  doc.text(`Date of Assessment: ${data.interviewDate}`, infoX, cardY + 26);

  // Score Box on Right of Card
  const scoreBoxX = cardX + cardWidth - 65;
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.setDrawColor(187, 247, 208); // emerald-200
  doc.roundedRect(scoreBoxX, cardY + 5, 57, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(5, 150, 105);
  doc.text('OVERALL PERFORMANCE', scoreBoxX + 28.5, cardY + 12, { align: 'center' });

  const scoreText = data.overallScore != null ? `${Math.round(data.overallScore)}/100` : 'N/A';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(5, 150, 105);
  doc.text(scoreText, scoreBoxX + 28.5, cardY + 20, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('VERIFIED PROFICIENCY', scoreBoxX + 28.5, cardY + 26, { align: 'center' });

  // ---------------------------------------------------------------------------
  // 6. Bottom Signature, Seal & Attribution
  // ---------------------------------------------------------------------------
  const bottomY = 158;

  // Left Block: Verification Seal & Certificate ID
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CERTIFICATE IDENTIFIER', margin + 25, bottomY);

  doc.setFont('courier', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(data.certificateId, margin + 25, bottomY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Verified Authentic via HirePilot AI Engine', margin + 25, bottomY + 11);

  // Center Block: Official Gold Seal Badge
  const sealX = pageWidth / 2;
  const sealY = bottomY + 5;
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.setLineWidth(0.6);
  doc.circle(sealX, sealY, 13, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(180, 83, 9); // amber-700
  doc.text('HIREPILOT', sealX, sealY - 4, { align: 'center' });
  doc.text('OFFICIAL', sealX, sealY, { align: 'center' });
  doc.text('CERTIFIED', sealX, sealY + 4, { align: 'center' });

  // Right Block: Founder Signature Block
  // STRICT RULE: Founder — Faishal Naushad (NO CEO, NO Co-Founder)
  const signX = pageWidth - margin - 50;

  // Signature line
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(signX - 30, bottomY + 5, signX + 30, bottomY + 5);

  // Styled Script / Signature Text
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Faishal Naushad', signX, bottomY + 2, { align: 'center' });

  // Strict Title Line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(79, 70, 229); // brand-600
  doc.text('Founder — Faishal Naushad', signX, bottomY + 10, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('HirePilot AI Platform', signX, bottomY + 14, { align: 'center' });

  // ---------------------------------------------------------------------------
  // 7. Micro Footer
  // ---------------------------------------------------------------------------
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `HirePilot AI Assessment Certification • Certificate ID: ${data.certificateId} • Issued on ${data.interviewDate}`,
    pageWidth / 2,
    pageHeight - margin - 4,
    { align: 'center' }
  );

  return doc;
}

function drawCertificateAvatarFallback(doc: jsPDF, x: number, y: number, size: number, name: string) {
  doc.setFillColor(79, 70, 229); // brand-600
  doc.roundedRect(x, y, size, size, size / 2, size / 2, 'F');

  const initials = name
    .split(' ')
    .map((part: string) => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'HP';

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(initials, x + size / 2, y + size / 2 + 4, { align: 'center' });
}

/**
 * Downloads the certificate PDF in the browser.
 */
export async function downloadCertificatePdf(data: CertificatePdfData, filename?: string): Promise<void> {
  const doc = await generateCertificatePdf(data);
  const sanitizedName = data.candidateName.replace(/[^a-zA-Z0-9]/g, '_');
  const finalFilename = filename || `HirePilot_Certificate_${sanitizedName}_${data.certificateId}.pdf`;
  doc.save(finalFilename);
}
