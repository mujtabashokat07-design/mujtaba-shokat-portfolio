import { 
  ProfileInfo, 
  NavLink, 
  DataFlowStep, 
  ProblemItem, 
  StructuredSkillGroup, 
  ExperienceItem, 
  EducationTimelineItem 
} from '../types';

export const PROFILE_DATA: ProfileInfo = {
  name: 'Mujtaba Shokat',
  role: 'Data Science & ML Intern',
  location: 'Hyderabad, Pakistan',
  availability: 'Open to Data Science & ML Internships',
  headline: {
    lead: 'Have a question.',
    sub: 'Let the data answer it.'
  },
  supportingText: 'I turn data into insights, machine-learning models, and working applications.',
  links: {
    github: 'https://github.com/mujtabashokat07-design',
    linkedin: 'https://www.linkedin.com/in/mujtabahayat/',
    email: 'mujtabashokat07@gmail.com'
  }
};

export const NAV_LINKS: NavLink[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export const DATA_FLOW_STEPS: DataFlowStep[] = [
  {
    id: 'question',
    index: '01',
    title: 'Question',
    subtitle: 'Defining the Problem',
    description: 'Transforming vague business inquiries, curiosity, and product questions into rigorous analytical hypotheses.',
    tag: 'HYPOTHESIS_FORMULATION',
    coordinates: 'QST-01',
    metricsLabel: 'INPUT_VECTOR',
    metricsValue: 'Domain Query'
  },
  {
    id: 'data',
    index: '02',
    title: 'Data',
    subtitle: 'Collection & Processing',
    description: 'Extracting, cleaning, structuring, and validating raw datasets to ensure integrity and eliminate bias.',
    tag: 'PIPELINE_EXTRACTION',
    coordinates: 'DAT-02',
    metricsLabel: 'DATA_INTEGRITY',
    metricsValue: 'Verified Schema'
  },
  {
    id: 'analysis',
    index: '03',
    title: 'Analysis',
    subtitle: 'Statistical Discovery',
    description: 'Exploring statistical distributions, correlation matrices, outlier signals, and fundamental underlying trends.',
    tag: 'EXPLORATORY_EDA',
    coordinates: 'ANL-03',
    metricsLabel: 'SIGNAL_NOISE',
    metricsValue: 'Pattern Isolated'
  },
  {
    id: 'model',
    index: '04',
    title: 'Model',
    subtitle: 'Machine Learning',
    description: 'Engineering features, selecting algorithms, training baseline models, and validating with reproducible metrics.',
    tag: 'MODEL_TRAINING',
    coordinates: 'MDL-04',
    metricsLabel: 'EVAL_METRIC',
    metricsValue: 'Cross-Validated'
  },
  {
    id: 'insight',
    index: '05',
    title: 'Insight',
    subtitle: 'Actionable Applications',
    description: 'Synthesizing technical findings into clear decisions, automated reports, and functional web applications.',
    tag: 'DECISION_ARTIFACT',
    coordinates: 'INS-05',
    metricsLabel: 'OUTCOME',
    metricsValue: 'Actionable Result'
  }
];

export const PROBLEMS_SOLVED: ProblemItem[] = [
  {
    id: 'prob-1',
    category: 'Exploratory Intelligence',
    title: 'Uncovering patterns in unstructured or complex data',
    description: 'Helping teams move from raw spreadsheets and messy records to clean, interpretable statistical narratives.',
    audience: 'both',
    deliverables: ['EDA Notebooks', 'Distribution Analysis', 'Executive Summaries']
  },
  {
    id: 'prob-2',
    category: 'Predictive Modeling',
    title: 'Building practical machine learning solutions',
    description: 'Developing classification and regression models trained on structured datasets to estimate outcomes and probabilities.',
    audience: 'recruiter',
    deliverables: ['Scikit-Learn Workflows', 'Feature Engineering', 'Model Evaluation']
  },
  {
    id: 'prob-3',
    category: 'Data-to-Application',
    title: 'Bridging algorithms into working user interfaces',
    description: 'Packaging data pipelines and ML inference into interactive tools and web apps that non-technical stakeholders can use.',
    audience: 'client',
    deliverables: ['Interactive Prototypes', 'API Endpoints', 'Data Visualizations']
  },
  {
    id: 'prob-4',
    category: 'Data Cleaning & Pipelines',
    title: 'Standardizing and prepping data for analysis',
    description: 'Automating repetitive data wrangling tasks, handling missing attributes, and building repeatable processing steps.',
    audience: 'both',
    deliverables: ['Pandas / NumPy Scripts', 'Data Validation', 'Structured Schemas']
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Data Science Intern',
    company: 'Code Alpha',
    type: 'Remote · Unpaid Internship',
    dates: 'June 2026 — July 2026',
    description: 'Hands-on data science internship involving project-based learning and practical application of data analysis and machine-learning workflows on structured datasets.',
    githubUrl: 'https://github.com/mujtabashokat07-design/CodeAlpha_tasks',
    highlights: [
      'Implemented exploratory data analysis routines and statistical summaries on assigned project datasets',
      'Applied supervised learning models using Scikit-Learn with preprocessing pipelines',
      'Documented workflows and shared reproducible Jupyter notebooks on GitHub'
    ]
  }
];

export const EDUCATION_TIMELINE: EducationTimelineItem[] = [
  {
    period: '2024 — 2026',
    degree: 'Intermediate in Pre-Engineering',
    institution: 'Government Degree College & P.G. Center Latifabad No. 11',
    location: 'Hyderabad, Pakistan',
    statusOrScore: 'Completed · Result Pending',
    isPending: true
  },
  {
    period: '2024',
    degree: 'Matriculation — Pre-Medical',
    institution: 'Tayyab High School',
    location: 'Hyderabad, Pakistan',
    statusOrScore: '88% Score',
    score: '88%'
  }
];

export const STRUCTURED_SKILL_GROUPS: StructuredSkillGroup[] = [
  {
    number: '01',
    category: 'Programming',
    skills: [
      { name: 'Python', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance', '500 AI Companies Analysis'] }
    ]
  },
  {
    number: '02',
    category: 'Data & Analysis',
    skills: [
      { name: 'Pandas', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance', '500 AI Companies Analysis'] },
      { name: 'NumPy', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'FIFA 2026 Player Performance'] },
      { name: 'Matplotlib', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'Seaborn', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'Exploratory Data Analysis', projectRefs: ['Global AI/ML Salary Analysis', '500 AI Companies Analysis'] }
    ]
  },
  {
    number: '03',
    category: 'Machine Learning',
    skills: [
      { name: 'Scikit-learn', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'Linear Regression', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'Logistic Regression', projectRefs: ['VoltSense AI'] },
      { name: 'Decision Tree', projectRefs: ['FIFA 2026 Player Performance'] },
      { name: 'Random Forest', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'KNN' }
    ]
  },
  {
    number: '04',
    category: 'Model Evaluation',
    skills: [
      { name: 'Accuracy', projectRefs: ['VoltSense AI', 'Telco Customer Churn'] },
      { name: 'Precision', projectRefs: ['Telco Customer Churn'] },
      { name: 'Recall', projectRefs: ['Telco Customer Churn'] },
      { name: 'F1 Score', projectRefs: ['VoltSense AI', 'Telco Customer Churn'] },
      { name: 'ROC-AUC', projectRefs: ['Telco Customer Churn'] },
      { name: 'Confusion Matrix', projectRefs: ['VoltSense AI'] },
      { name: 'R²', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'MAE', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'MSE', projectRefs: ['Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] },
      { name: 'Train / Test Split', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance'] }
    ]
  },
  {
    number: '05',
    category: 'Application Development',
    skills: [
      { name: 'Streamlit', projectRefs: ['VoltSense AI', 'Telco Customer Churn', 'Global AI/ML Salary Analysis', 'FIFA 2026 Player Performance', '500 AI Companies Analysis'] },
      { name: 'FastAPI', projectRefs: ['VoltSense AI'] },
      { name: 'Uvicorn', projectRefs: ['VoltSense AI'] }
    ]
  },
  {
    number: '06',
    category: 'Data / Backend',
    skills: [
      { name: 'MongoDB Atlas', projectRefs: ['VoltSense AI'] }
    ]
  },
  {
    number: '07',
    category: 'Tools & Environments',
    skills: [
      { name: 'Jupyter' },
      { name: 'Google Colab' },
      { name: 'VS Code' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Kaggle' }
    ]
  }
];

export const CURRENTLY_LEARNING = {
  skill: 'SQL',
  note: 'Currently studying relational database querying, joins, aggregations, and data extraction fundamentals.'
};
