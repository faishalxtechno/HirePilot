import { jsPDF } from 'jspdf';
import { InterviewReport, Interview, UserProfile } from '../../types';
import { formatDate } from '../utils';
import { loadImageAsBase64 } from './pdfHelpers';

export interface ResultPdfData {
  report: InterviewReport;
  interview?: Interview;
  userProfile?: UserProfile | null;
  candidateName: string;
  role: string;
  interviewDate: string;
  resultId: string;
  certificateId: string;
  avatarUrl?: string;
}

export async function generateInterviewResultPdf(data: ResultPdfData): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // ---------------------------------------------------------------------------
  // Top Header Banner
  // ---------------------------------------------------------------------------
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Accent Bar
  doc.setFillColor(79, 70, 229); // brand-600
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Brand Name & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('HIREPILOT', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(199, 210, 254); // indigo-200
  doc.text('AI INTERVIEW PERFORMANCE REPORT', margin, 19);

  // Document meta on top right
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(`Result ID: ${data.resultId}`, pageWidth - margin, 12, { align: 'right' });
  doc.text(`Date: ${data.interviewDate}`, pageWidth - margin, 18, { align: 'right' });
  doc.text(`Cert ID: ${data.certificateId}`, pageWidth - margin, 24, { align: 'right' });

  let y = 37;

  // ---------------------------------------------------------------------------
  // Candidate Profile Section
  // ---------------------------------------------------------------------------
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'FD');

  // Load avatar image if available
  const avatarImage = await loadImageAsBase64(data.avatarUrl);
  const avatarSize = 22;
  const avatarX = margin + 5;
  const avatarY = y + 5;

  if (avatarImage) {
    try {
      doc.addImage(avatarImage.dataUrl, avatarImage.format, avatarX, avatarY, avatarSize, avatarSize);
    } catch (e) {
      drawFallbackAvatar(doc, avatarX, avatarY, avatarSize, data.candidateName);
    }
  } else {
    drawFallbackAvatar(doc, avatarX, avatarY, avatarSize, data.candidateName);
  }

  // Candidate Details Text
  const textStartX = avatarX + avatarSize + 7;
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(data.candidateName, textStartX, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(79, 70, 229); // brand-600
  doc.text(`Target Role: ${data.role}`, textStartX, y + 17);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(
    `Assessment Type: ${data.interview?.interview_type ? data.interview.interview_type.toUpperCase() : 'TECHNICAL'}  |  Difficulty: ${data.interview?.difficulty ? data.interview.difficulty.toUpperCase() : 'MEDIUM'}`,
    textStartX,
    y + 24
  );

  // Overall Score Badge on Profile Card (Right side)
  const scoreCardX = pageWidth - margin - 40;
  doc.setFillColor(79, 70, 229); // brand-600
  doc.roundedRect(scoreCardX, y + 4, 35, 24, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('OVERALL SCORE', scoreCardX + 17.5, y + 10, { align: 'center' });

  const overallScore = data.report.overall_score != null ? Math.round(data.report.overall_score) : null;
  const overallScoreText = overallScore != null ? `${overallScore}/100` : 'N/A';

  doc.setFontSize(14);
  doc.text(overallScoreText, scoreCardX + 17.5, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text(
    overallScore == null
      ? 'EVALUATION'
      : overallScore >= 80
      ? 'STRONG HIRE'
      : overallScore >= 65
      ? 'HIRE'
      : 'LEANING HIRE',
    scoreCardX + 17.5,
    y + 24,
    { align: 'center' }
  );

  y += 37;

  // ---------------------------------------------------------------------------
  // Detailed Score Breakdown Cards (4 Grid)
  // ---------------------------------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PERFORMANCE BREAKDOWN', margin, y + 2);
  y += 5;

  const cardWidth = (contentWidth - 9) / 4;
  const cardHeight = 20;

  const technicalScore = data.report.technical_score != null ? Math.round(data.report.technical_score) : null;
  const communicationScore = data.report.communication_score != null ? Math.round(data.report.communication_score) : null;
  const confidenceScore = data.report.confidence_score != null
    ? Math.round(data.report.confidence_score)
    : (data.report.answer_quality_score != null ? Math.round(data.report.answer_quality_score) : null);
  const problemSolvingScore = data.report.problem_solving_score != null ? Math.round(data.report.problem_solving_score) : null;

  const metrics = [
    { label: 'Technical', text: technicalScore != null ? `${technicalScore}/100` : 'N/A', color: [79, 70, 229] },
    { label: 'Communication', text: communicationScore != null ? `${communicationScore}/100` : 'N/A', color: [5, 150, 105] },
    { label: 'Confidence', text: confidenceScore != null ? `${confidenceScore}/100` : 'N/A', color: [217, 119, 6] },
    { label: 'Problem Solving', text: problemSolvingScore != null ? `${problemSolvingScore}/100` : 'N/A', color: [147, 51, 234] },
  ];

  metrics.forEach((m, idx) => {
    const cx = margin + idx * (cardWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cx, y, cardWidth, cardHeight, 2, 2, 'FD');

    // Label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, cx + cardWidth / 2, y + 7, { align: 'center' });

    // Score Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(m.color[0], m.color[1], m.color[2]);
    doc.text(m.text, cx + cardWidth / 2, y + 15, { align: 'center' });
  });

  y += cardHeight + 7;

  // ---------------------------------------------------------------------------
  // Strengths & Areas to Improve (2 columns)
  // ---------------------------------------------------------------------------
  const colWidth = (contentWidth - 6) / 2;
  const colHeight = 54;

  // 1. Strengths Column
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.setDrawColor(187, 247, 208); // emerald-200
  doc.roundedRect(margin, y, colWidth, colHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(5, 150, 105); // emerald-700
  doc.text('Key Strengths', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59); // slate-800

  let strY = y + 14;
  const strengthsList = (data.report.strengths || []).slice(0, 4);
  strengthsList.forEach((s) => {
    const lines = doc.splitTextToSize(`•  ${s}`, colWidth - 12);
    doc.text(lines, margin + 6, strY);
    strY += lines.length * 3.8 + 2;
  });

  // 2. Areas to Improve Column
  const rightColX = margin + colWidth + 6;
  doc.setFillColor(254, 243, 199); // amber-50
  doc.setDrawColor(253, 230, 138); // amber-200
  doc.roundedRect(rightColX, y, colWidth, colHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9); // amber-700
  doc.text('Areas for Improvement', rightColX + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);

  let weakY = y + 14;
  const weaknessesList = (data.report.weaknesses || []).slice(0, 4);
  weaknessesList.forEach((w) => {
    const lines = doc.splitTextToSize(`•  ${w}`, colWidth - 12);
    doc.text(lines, rightColX + 6, weakY);
    weakY += lines.length * 3.8 + 2;
  });

  y += colHeight + 7;

  // ---------------------------------------------------------------------------
  // AI Feedback & Executive Summary
  // ---------------------------------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('AI EXECUTIVE FEEDBACK', margin, y + 2);
  y += 5;

  const feedbackHeight = 54;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, feedbackHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const summaryText = data.report.ai_summary || 'The candidate demonstrated a solid technical grasp of core concepts with clear potential for the target role.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 12);
  doc.text(summaryLines, margin + 6, y + 9);

  // Recommendations
  if (data.report.recommendations && data.report.recommendations.length > 0) {
    const recY = y + 26;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text('Recommended Focus Areas:', margin + 6, recY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    let rLineY = recY + 5;
    data.report.recommendations.slice(0, 3).forEach((r, idx) => {
      doc.text(`${idx + 1}. ${r}`, margin + 8, rLineY);
      rLineY += 5;
    });
  }

  // ---------------------------------------------------------------------------
  // Document Footer
  // ---------------------------------------------------------------------------
  const footerY = pageHeight - 16;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Generated by HirePilot AI Interview Platform', margin, footerY + 5);
  doc.text(`Official Certificate ID: ${data.certificateId}`, pageWidth / 2, footerY + 5, { align: 'center' });
  doc.text(`Founder — Faishal Naushad`, pageWidth - margin, footerY + 5, { align: 'right' });

  return doc;
}

function drawFallbackAvatar(doc: jsPDF, x: number, y: number, size: number, name: string) {
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
  doc.setFontSize(10);
  doc.text(initials, x + size / 2, y + size / 2 + 3.5, { align: 'center' });
}

/**
 * Downloads the interview result PDF in the browser.
 */
export async function downloadInterviewResultPdf(data: ResultPdfData, filename?: string): Promise<void> {
  const doc = await generateInterviewResultPdf(data);
  const sanitizedName = data.candidateName.replace(/[^a-zA-Z0-9]/g, '_');
  const finalFilename = filename || `HirePilot_Result_${sanitizedName}_${data.resultId}.pdf`;
  doc.save(finalFilename);
}
