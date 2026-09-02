import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const publicAssetsDir = path.resolve('public/assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const outputPath = path.join(publicAssetsDir, 'Mujtaba_Shokat_Resume.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Primary colors
const PRIMARY_COLOR = '#1e3a8a'; // Dark blue / navy
const TEXT_COLOR = '#1f2937';
const MUTED_COLOR = '#4b5563';
const LINK_COLOR = '#0284c7';
const LINE_COLOR = '#cbd5e1';

function drawSectionHeading(title: string) {
  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica-Bold').fillColor(PRIMARY_COLOR).text(title);
  const y = doc.y + 2;
  doc.moveTo(45, y).lineTo(550, y).strokeColor(LINE_COLOR).lineWidth(0.75).stroke();
  doc.y = y + 5;
}

// ----------------------------------------------------
// PAGE 1
// ----------------------------------------------------
// Header
doc.fontSize(18).font('Helvetica-Bold').fillColor(PRIMARY_COLOR).text('MUJTABA SHOKAT', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(10).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Data Science & AI/ML | Machine Learning | NLP', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica').fillColor(MUTED_COLOR).text('+92 315 3515062 | mujtabashokat07@gmail.com | Pakistan', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica').fillColor(LINK_COLOR).text('LinkedIn | GitHub | Portfolio', { align: 'center' });

// PROFILE
drawSectionHeading('PROFILE');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(
  'Aspiring Data Science and AI/ML professional with hands-on project and internship experience in Python, data analysis, machine learning, NLP, and predictive modeling. Built end-to-end applications using Pandas, NumPy, Scikit-learn, Streamlit, FastAPI, and MongoDB. Comfortable with data cleaning, EDA, model evaluation, REST APIs, and building simple ML applications. Seeking Data Science, AI/ML, and related internship roles.',
  { lineGap: 2 }
);

// TECHNICAL SKILLS
drawSectionHeading('TECHNICAL SKILLS');
const skills = [
  { label: 'Programming', val: 'Python, Pandas, NumPy' },
  { label: 'Data Analysis', val: 'EDA, data cleaning, statistics, feature preprocessing, data visualization' },
  { label: 'Machine Learning', val: 'Scikit-learn, regression, classification, clustering, model evaluation' },
  { label: 'NLP', val: 'Transformers, Hugging Face, text classification, sentiment analysis' },
  { label: 'Visualization', val: 'Matplotlib, Seaborn, Plotly' },
  { label: 'Development', val: 'Streamlit, FastAPI, REST APIs, Uvicorn' },
  { label: 'Database & Tools', val: 'MongoDB, MongoDB Atlas, Git, GitHub, Jupyter, Google Colab, VS Code, Kaggle' }
];

skills.forEach(s => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text(`${s.label}: `, { continued: true })
     .font('Helvetica').fillColor(MUTED_COLOR).text(s.val, { lineGap: 1.5 });
});

// EXPERIENCE
drawSectionHeading('EXPERIENCE');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Data Science Intern — CodeAlpha ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Remote | June 2026 – July 2026');

const expBullets = [
  'Completed three classification tasks using Iris, Car Data, and Advertising datasets.',
  'Cleaned and prepared datasets for analysis and model training.',
  'Applied EDA and data visualization to understand patterns and features.',
  'Built and evaluated machine learning models using Python and Scikit-learn.',
  'Documented and maintained internship work in GitHub.'
];
expBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${b}`, { indent: 10, lineGap: 1.5 });
});

// SELECTED PROJECTS
drawSectionHeading('SELECTED PROJECTS');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('VoltSense AI — Electricity Usage Prediction ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Python · ML · FastAPI · MongoDB · Streamlit');

const voltesenseBullets = [
  'Built an ML application to predict electricity usage periods and identify peak and low times.',
  'Used Linear Regression and Random Forest for prediction and model comparison.',
  'Created REST API endpoints with FastAPI and connected the API with the application.',
  'Used MongoDB Atlas to store application data and prediction history.',
  'Deployed the Streamlit user interface with a live online demo.'
];
voltesenseBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${b}`, { indent: 10, lineGap: 1.5 });
});
doc.fontSize(8.5).font('Helvetica').fillColor(LINK_COLOR).text('GitHub · Live Demo', { indent: 10, lineGap: 4 });

doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Telco Customer Churn Prediction ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Python · Scikit-learn · Streamlit');

const churnBullets = [
  'Built an end-to-end churn prediction workflow from data cleaning to model evaluation.',
  'Handled missing values and categorical features during preprocessing.',
  'Trained a Random Forest classifier and evaluated it using accuracy and ROC-AUC.',
  'Created a Streamlit dashboard for EDA and customer churn prediction.'
];
churnBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${b}`, { indent: 10, lineGap: 1.5 });
});
doc.fontSize(8.5).font('Helvetica').fillColor(LINK_COLOR).text('GitHub · Live Demo', { indent: 10 });

// ----------------------------------------------------
// PAGE 2
// ----------------------------------------------------
doc.addPage();

drawSectionHeading('SELECTED PROJECTS — CONTINUED');

doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Global AI/ML Salary Analysis ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Python · EDA · Regression');

const salaryBullets = [
  'Analyzed 40,332 AI/ML job records to study salary patterns across roles, countries, and experience levels.',
  'Removed duplicate records and prepared the cleaned data for analysis and modeling.',
  'Compared Linear Regression and Random Forest for salary prediction.',
  'Evaluated models using MAE, RMSE, and R².'
];
salaryBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${b}`, { indent: 10, lineGap: 1.5 });
});
doc.fontSize(8.5).font('Helvetica').fillColor(LINK_COLOR).text('GitHub · Live Demo', { indent: 10, lineGap: 4 });

doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('FIFA 2026 Player Performance ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Python · ML · Streamlit');

const fifaBullets = [
  'Analyzed player data to find performance patterns and trends.',
  'Performed data cleaning and EDA using Python and Pandas.',
  'Compared Linear Regression, Decision Tree, and Random Forest models.',
  'Built a Streamlit dashboard for analysis and prediction.'
];
fifaBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${b}`, { indent: 10, lineGap: 1.5 });
});
doc.fontSize(8.5).font('Helvetica').fillColor(LINK_COLOR).text('GitHub', { indent: 10 });

// EDUCATION
drawSectionHeading('EDUCATION');
doc.fontSize(9).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Intermediate — Pre-Engineering ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Government Degree College & P.G. Center, Latifabad No. 11 | 2024–2026');
doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(MUTED_COLOR).text('Result Awaited', { indent: 10, lineGap: 2 });

doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('Artificial Intelligence & Data Science ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Saylani Mass IT Training (SMIT) | 2025–2026');
doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(MUTED_COLOR).text('Completed; Certificate Awaited', { indent: 10 });

// CERTIFICATIONS & VIRTUAL EXPERIENCE
drawSectionHeading('CERTIFICATIONS & VIRTUAL EXPERIENCE');
const certs = [
  'CodeAlpha — Data Science Internship Certificate',
  'HP LIFE — Data Science & Analytics',
  'British Airways — Data Science Job Simulation, Forage'
];
certs.forEach(c => {
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(`• ${c}`, { indent: 10, lineGap: 1.5 });
});

// ADDITIONAL PROJECT
drawSectionHeading('ADDITIONAL PROJECT');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_COLOR).text('500 AI Companies Analysis ', { continued: true })
   .font('Helvetica').fillColor(MUTED_COLOR).text('| Python · EDA');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_COLOR).text(
  '• Analyzed AI company data to explore company locations, funding, valuation, industries, and market trends.',
  { indent: 10, lineGap: 1.5 }
);
doc.fontSize(8.5).font('Helvetica').fillColor(LINK_COLOR).text('GitHub', { indent: 10 });

doc.end();

writeStream.on('finish', () => {
  console.log('Master resume PDF generated successfully at:', outputPath);
});
