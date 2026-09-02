import { ProjectData } from '../types';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'voltsense-ai',
    number: '01',
    title: 'VoltSense AI',
    category: 'Machine Learning · Classification · Deployment',
    filterCategories: ['all', 'ml', 'apps'],
    isFeatured: true,
    problemQuestion: 'Can electricity consumption patterns help identify peak-hour periods?',
    description: 'Electricity peak-hour classification and 24-hour peak probability analysis built from household power consumption data with an interactive prediction interface.',
    methods: [
      'UCI Household Electric Power Dataset',
      'Feature Scaling',
      'Logistic Regression',
      'Random Forest',
      'Top-25% Thresholding',
      'FastAPI',
      'Streamlit',
      'MongoDB Atlas'
    ],
    githubUrl: 'https://github.com/mujtabashokat07-design/VoltSense_AI',
    liveDemoUrl: 'https://voltsenseai-retnjyqqjq5cjp7whf6rpu.streamlit.app/',
    evidenceImages: [
      {
        url: '/assets/projects/voltsense-1.webp',
        thumbnailUrl: '/assets/projects/voltsense-1-thumb.webp',
        title: 'Electricity Peak-Hour Classification Dashboard',
        caption: 'VoltSense AI overview displaying peak-hour classification telemetry, MongoDB connection status, and consumption metrics.',
        alt: 'VoltSense AI peak-hour classification dashboard with MongoDB connection status and consumption metrics',
        isPrimary: true
      },
      {
        url: '/assets/projects/voltsense-2.webp',
        thumbnailUrl: '/assets/projects/voltsense-2-thumb.webp',
        title: '24-Hour Diurnal Peak Probability Analysis',
        caption: 'Interactive diurnal active power consumption curve with day configuration selector and peak-hour probability analysis.',
        alt: 'VoltSense AI 24-hour diurnal electric power curve with hourly consumption line and peak-hour classification'
      },
      {
        url: '/assets/projects/voltsense-3.webp',
        thumbnailUrl: '/assets/projects/voltsense-3-thumb.webp',
        title: 'Model Laboratory & Benchmark Evaluation',
        caption: 'Model laboratory interface benchmarking classification performance across models with Accuracy and F1-Score metrics.',
        alt: 'VoltSense AI Model Laboratory displaying classification evaluation metrics including Accuracy and F1-Score'
      }
    ],
    caseStudy: {
      openingSummary: 'Electricity peak-hour classification and 24-hour peak probability analysis built from household power consumption data with an interactive prediction interface.',
      section01Problem: {
        title: 'Classifying Peak-Hour Electricity Usage',
        description: 'Electricity consumption changes throughout the day. The project explores whether consumption patterns can be used to classify periods with higher demand.'
      },
      section02Data: {
        datasetName: 'UCI Household Electric Power Consumption',
        description: 'Contains minute-by-minute measurements of household electric power consumption, including active power, reactive power, voltage, and sub-metering readings across multiple electrical zones.',
        isSynthetic: false,
        pipeline: [
          'Raw household power consumption records',
          'Engineered temporal & aggregate electrical features',
          'Standardized feature matrix for classification input'
        ]
      },
      section03Approach: {
        description: 'The workflow processes time-series power measurements, scales feature variables, and applies a top-25% thresholding rule on active power consumption to establish the peak-hour binary classification target.',
        workflowSteps: [
          'Data Ingestion',
          'Feature Preparation',
          'Feature Scaling',
          'Classification',
          'Evaluation',
          'Prediction Interface'
        ],
        keyMethod: 'Top-25% active power thresholding to formulate binary peak vs. standard consumption target'
      },
      section04Model: {
        description: 'Two classification approaches were used to compare how different models handled the classification task.',
        modelsUsed: [
          'Logistic Regression (Linear baseline classifier)',
          'Random Forest (Non-linear decision ensemble)'
        ]
      },
      section05Evaluation: {
        concepts: [
          'Accuracy',
          'F1 Score',
          'Confusion Matrix'
        ],
        note: 'Model evaluation is included in the project repository.'
      },
      section06WhatIBuilt: {
        architectureSteps: [
          'Machine Learning Model',
          'FastAPI Service',
          'MongoDB Atlas',
          'Streamlit Interface'
        ],
        details: [
          'FastAPI: Provides a lightweight REST API for input validation and model inference.',
          'MongoDB Atlas: Stores historical prediction queries and input parameters.',
          'Streamlit Interface: Delivers an interactive web application allowing users to submit consumption inputs and inspect classification outputs.'
        ]
      }
    }
  },
  {
    id: 'telco-churn',
    number: '02',
    title: 'Telco Customer Churn',
    category: 'Machine Learning · Classification · Customer Analytics',
    filterCategories: ['all', 'ml', 'apps'],
    problemQuestion: 'Which customers may be at higher risk of churn?',
    description: 'Customer churn classification and customer risk analysis through an interactive prediction interface.',
    methods: [
      'IBM Telco Customer Churn Dataset',
      'Data Preprocessing',
      'One-Hot Encoding',
      'StandardScaler',
      'ColumnTransformer',
      'Random Forest Classifier',
      'Accuracy / Precision / Recall / F1 / ROC-AUC',
      'Streamlit'
    ],
    githubUrl: 'https://github.com/mujtabashokat07-design/telco-customer-churn-project',
    liveDemoUrl: 'https://telco-customer-churn-project-96d6k2cimdhukcwadpcrux.streamlit.app/',
    evidenceImages: [
      {
        url: '/assets/projects/telco-churn-1.webp',
        thumbnailUrl: '/assets/projects/telco-churn-1-thumb.webp',
        title: 'Telco Churn Prediction Suite Overview',
        caption: 'Executive business context view showing 7,043 customer records, 19 predictor features, 26.58% churn rate, and 29.0 months median tenure.',
        alt: 'Telco Customer Churn Prediction Suite overview displaying 7043 customer records, 19 predictor features, and 26.58% churn rate',
        isPrimary: true
      },
      {
        url: '/assets/projects/telco-churn-2.webp',
        thumbnailUrl: '/assets/projects/telco-churn-2-thumb.webp',
        title: 'Interactive Exploratory Data Analysis Dashboard',
        caption: 'Bivariate exploratory analysis dashboard with tenure and gender selectors, churn distribution, and monthly charges comparison.',
        alt: 'Telco Customer Churn EDA dashboard with interactive feature selectors, churn distribution chart, and monthly charges breakdown'
      },
      {
        url: '/assets/projects/telco-churn-3.webp',
        thumbnailUrl: '/assets/projects/telco-churn-3-thumb.webp',
        title: 'Production Customer Churn Prediction System',
        caption: 'Interactive prediction form reviewing customer service parameters and calculating churn probability (12.50% likely to stay).',
        alt: 'Telco Customer Churn prediction result screen displaying customer input review table and churn probability score'
      }
    ],
    caseStudy: {
      openingSummary: 'Customer churn classification and customer risk analysis through an interactive prediction interface.',
      section01Problem: {
        title: 'Identifying Customer Churn Risk Factors',
        description: 'Which customers may be at higher risk of churn? The project explores how customer contract types, tenure duration, subscribed service packages, and billing preferences correlate with customer cancellation.'
      },
      section02Data: {
        datasetName: 'IBM Telco Customer Churn',
        description: 'Contains customer account records covering demographic indicators, subscribed phone and internet features, contract durations, payment methods, and monthly charges.',
        isSynthetic: false,
        pipeline: [
          'Raw customer profile & service records',
          'Categorical encoding & continuous feature scaling via ColumnTransformer',
          'Preprocessed feature array for churn classification'
        ]
      },
      section03Approach: {
        description: 'Constructed an automated preprocessing pipeline using Scikit-Learn ColumnTransformer with One-Hot Encoding for categorical features and StandardScaler for numerical features, followed by Random Forest classification and multi-metric evaluation.',
        workflowSteps: [
          'Data Preprocessing',
          'One-Hot Encoding',
          'StandardScaler Normalization',
          'Random Forest Training',
          'Multi-Metric Evaluation',
          'Streamlit Interface'
        ],
        keyMethod: 'ColumnTransformer pipeline for uniform preprocessing of categorical and numerical variables'
      },
      section04Model: {
        description: 'A Random Forest Classifier was trained to handle non-linear interactions across multi-dimensional customer features and provide feature importance signals.',
        modelsUsed: [
          'Random Forest Classifier',
          'ColumnTransformer Preprocessing Pipeline'
        ]
      },
      section05Evaluation: {
        concepts: [
          'Accuracy',
          'Precision',
          'Recall',
          'F1 Score',
          'ROC-AUC'
        ],
        note: 'Model evaluation is included in the project repository.'
      },
      section06WhatIBuilt: {
        architectureSteps: [
          'Scikit-Learn Preprocessing Pipeline',
          'Random Forest Estimator',
          'Interactive Streamlit Interface'
        ],
        details: [
          'Scikit-Learn Pipeline: Bundles data transformation and inference into an end-to-end reproducible workflow.',
          'Random Forest Estimator: Evaluates customer feature inputs to estimate churn probability.',
          'Streamlit Interface: Provides an interactive input form for simulating customer profiles and inspecting estimated risk.'
        ]
      }
    }
  },
  {
    id: 'salary-analysis',
    number: '03',
    title: 'Global AI/ML Salary Analysis',
    category: 'Regression · EDA · Data Analysis',
    filterCategories: ['all', 'analysis', 'ml', 'apps'],
    problemQuestion: 'What factors are associated with differences in AI/ML salaries?',
    description: 'Global AI/ML salary analysis using exploratory analysis and regression modeling.',
    methods: [
      'Global AI/ML Salary Dataset (2020–2024)',
      'salary_in_usd Target',
      'Exploratory Data Analysis',
      'One-Hot Encoding',
      'Linear Regression',
      'Random Forest Regressor',
      'MAE / MSE / R²',
      'Interactive Salary Prediction Calculator',
      'Plotly Visualizations'
    ],
    githubUrl: 'https://github.com/mujtabashokat07-design/Global-AI-ML-Salary-Analysis',
    liveDemoUrl: 'https://global-ai-ml-salary-analysis-u8vx9otbmaajscp8asbyub.streamlit.app/',
    evidenceImages: [
      {
        url: '/assets/projects/salary-analysis-1.webp',
        thumbnailUrl: '/assets/projects/salary-analysis-1-thumb.webp',
        title: 'Global AI & ML Salary Analysis Dashboard Overview',
        caption: 'Dataset overview interface analyzing compensation records across job roles, experience levels, and salary_in_usd tiers.',
        alt: 'Global AI and ML Salary Analysis dashboard overview showing dataset schema and average salary telemetry',
        isPrimary: true
      },
      {
        url: '/assets/projects/salary-analysis-2.webp',
        thumbnailUrl: '/assets/projects/salary-analysis-2-thumb.webp',
        title: 'Comparative Salary Analysis & Role Distribution',
        caption: 'Exploratory compensation distribution view highlighting an average salary metric of $155,086 alongside role-based salary tiers.',
        alt: 'Global AI/ML Salary Analysis showing average salary metric of $155,086 and cross-role compensation distribution'
      },
      {
        url: '/assets/projects/salary-analysis-3.webp',
        thumbnailUrl: '/assets/projects/salary-analysis-3-thumb.webp',
        title: 'Interactive Salary Prediction Interface',
        caption: 'Inference form collecting work year, experience tier, employment type, job title, and remote ratio to predict compensation.',
        alt: 'Global AI/ML Salary prediction interface with input fields for job details, experience level, and remote ratio'
      }
    ],
    caseStudy: {
      openingSummary: 'Global AI/ML salary analysis using exploratory analysis and regression modeling.',
      section01Problem: {
        title: 'Analyzing AI/ML Compensation Factors',
        description: 'What factors are associated with differences in AI/ML salaries? The project explores how specialized job titles, experience tiers, work settings (remote, hybrid, on-site), and geographic locations correlate with compensation, using salary_in_usd as the prediction target.'
      },
      section02Data: {
        datasetName: 'Global AI/ML Salary Dataset, 2020–2024',
        description: 'Explores compensation records with salary_in_usd as the prediction target across data science, machine learning, and AI engineering roles over a 5-year period.',
        isSynthetic: false,
        pipeline: [
          'Raw international compensation logs with salary_in_usd target',
          'USD conversion normalization & categorical groupings',
          'One-Hot Encoded regression feature matrix'
        ]
      },
      section03Approach: {
        description: 'Conducted exploratory data analysis with interactive Plotly visual charts to inspect distribution skewness, applied One-Hot Encoding to categorical attributes, and trained regression models to evaluate salary relationships.',
        workflowSteps: [
          'Data Cleaning',
          'Exploratory Data Analysis (EDA)',
          'One-Hot Encoding',
          'Regression Modeling',
          'Metric Evaluation (MAE, MSE, R²)',
          'Interactive Salary Prediction Calculator'
        ],
        keyMethod: 'Multi-variable exploratory visual analysis paired with regression modeling and One-Hot Encoding'
      },
      section04Model: {
        description: 'Linear Regression and Random Forest Regressor models were trained to model compensation relationships with salary_in_usd as the prediction target across categorical and continuous predictors.',
        modelsUsed: [
          'Linear Regression (Parametric baseline)',
          'Random Forest Regressor (Non-linear ensemble)',
          'Plotly Visual Analytics Engine'
        ]
      },
      section05Evaluation: {
        concepts: [
          'Mean Absolute Error (MAE)',
          'Mean Squared Error (MSE)',
          'Coefficient of Determination (R²)'
        ],
        note: 'Model evaluation and residual metrics (MAE, MSE, R²) are included in the project repository.'
      },
      section06WhatIBuilt: {
        architectureSteps: [
          'Statistical & EDA Pipeline',
          'Regression Models',
          'Plotly Visualizations',
          'Interactive Salary Prediction Calculator'
        ],
        details: [
          'Plotly Visualizations: Provides interactive distribution histograms, box plots, and geographic salary comparisons.',
          'Regression Estimator: Predicts salary_in_usd based on selected role, experience level, and employment parameters using Linear Regression and Random Forest Regressor.',
          'Interactive Salary Prediction Calculator: Allows visitors to test role, experience, and location combinations interactively in Streamlit.'
        ]
      }
    }
  },
  {
    id: 'fifa-performance',
    number: '04',
    title: 'FIFA 2026 Player Performance',
    category: 'Regression · Model Comparison · Sports Analytics',
    filterCategories: ['all', 'analysis', 'ml', 'apps'],
    problemQuestion: 'Can player attributes help estimate performance?',
    description: 'Player performance analysis and regression model comparison estimating player performance from FIFA 2026 player attributes.',
    methods: [
      'FIFA World Cup 2026 Player Dataset',
      'Feature Selection',
      'Target Leakage Prevention',
      'Linear Regression',
      'Decision Tree Regressor',
      'Random Forest Regressor',
      'R² / MSE / MAE Benchmarks',
      'Feature Importance Analysis',
      'Player Radar Comparison'
    ],
    githubUrl: 'https://github.com/mujtabashokat07-design/FIFA-2026-Player-Performance',
    liveDemoUrl: 'https://fifa-2026-player-performance-6fb8cerkerraedvjfhvcnv2.streamlit.app/',
    evidenceImages: [
      {
        url: '/assets/projects/fifa-2026-1.webp',
        thumbnailUrl: '/assets/projects/fifa-2026-1-thumb.webp',
        title: 'FIFA 2026 AI Performance Dashboard Overview',
        caption: 'Tournament telemetry tracking 1,248 players across 48 nations with performance by nation rankings and squad position distributions.',
        alt: 'FIFA 2026 AI Performance Dashboard showing 1,248 players across 48 nations with performance by nation rankings',
        isPrimary: true
      },
      {
        url: '/assets/projects/fifa-2026-2.webp',
        thumbnailUrl: '/assets/projects/fifa-2026-2-thumb.webp',
        title: 'Exploratory Data Analysis: Player Ranking by Goals',
        caption: 'Exploratory data analysis interface tracking top goal scorers, player appearances, and positional performance metrics.',
        alt: 'FIFA 2026 EDA interface showing player rankings by goals with interactive filter controls and match metrics'
      },
      {
        url: '/assets/projects/fifa-2026-3.webp',
        thumbnailUrl: '/assets/projects/fifa-2026-3-thumb.webp',
        title: 'Machine Learning Performance Scoring Engine',
        caption: 'Predictive modeling interface simulating match parameters (speed, minutes, pass accuracy, stamina, tackles) to output a performance score (60.68).',
        alt: 'FIFA 2026 machine learning performance scoring screen with player attribute input sliders and predicted score output'
      }
    ],
    caseStudy: {
      openingSummary: 'Player performance analysis and regression model comparison estimating player performance from FIFA 2026 player attributes.',
      section01Problem: {
        title: 'Estimating Performance from Player Attributes',
        description: 'Can player attributes help estimate performance? The project investigates whether multi-dimensional technical, tactical, and physical skill ratings can reliably estimate overall player performance without target leakage.'
      },
      section02Data: {
        datasetName: 'FIFA World Cup 2026 Player Performance Dataset',
        description: 'Contains multi-dimensional player attributes including pace, shooting, passing, dribbling, defending, and physical metrics alongside overall player performance scores.',
        isSynthetic: false,
        pipeline: [
          'Raw multi-dimensional player attribute records',
          'Feature selection & target leakage prevention filtering',
          'Benchmarking regression feature matrix'
        ]
      },
      section03Approach: {
        description: 'Applied systematic feature selection to prevent target leakage, trained baseline and tree-based regression models, compared residual metrics, and derived feature importance rankings alongside player radar comparisons.',
        workflowSteps: [
          'Feature Selection',
          'Target Leakage Prevention',
          'Model Benchmarking',
          'Metric Comparison',
          'Feature Importance Analysis',
          'Player Radar Comparison'
        ],
        keyMethod: 'Rigorous target leakage prevention followed by comparative multi-model regression benchmarking'
      },
      section04Model: {
        description: 'Three regression approaches were benchmarked side-by-side on identical training/testing splits to compare linear and non-linear performance.',
        modelsUsed: [
          'Linear Regression (Parametric linear benchmark)',
          'Decision Tree Regressor (Non-linear single-tree baseline)',
          'Random Forest Regressor (Ensemble averaging model)'
        ]
      },
      section05Evaluation: {
        concepts: [
          'Coefficient of Determination (R²)',
          'Mean Squared Error (MSE)',
          'Mean Absolute Error (MAE)',
          'Feature Importance Rankings'
        ],
        note: 'Model evaluation is included in the project repository.'
      },
      section06WhatIBuilt: {
        architectureSteps: [
          'Regression Benchmarking Pipeline',
          'Feature Importance Analyzer',
          'Player Radar Geometry Tool',
          'Streamlit Dashboard'
        ],
        details: [
          'Benchmarking Pipeline: Compares multiple regression algorithms on identical test splits.',
          'Player Radar Comparison: Visualizes multi-dimensional attribute strengths between players side-by-side.',
          'Streamlit Dashboard: Provides an interactive player comparison and performance estimation dashboard.'
        ]
      }
    }
  },
  {
    id: '500-ai-companies',
    number: '05',
    title: '500 AI Companies Analysis',
    category: 'EDA · Business Analysis · AI Adoption',
    filterCategories: ['all', 'analysis', 'apps'],
    problemQuestion: 'How does AI adoption vary across companies, industries, and countries?',
    description: 'AI adoption, ROI, maturity, categorical analysis, crosstabs, aggregations, and distribution analysis across companies, industries, and countries using descriptive statistics and interactive filtering.',
    methods: [
      'Synthetic Fortune 500 AI Adoption Dataset (2020–2025)',
      'AI Adoption, ROI & Maturity Analysis',
      'Descriptive Statistics',
      'Categorical Grouping',
      'Crosstabs & Aggregations',
      'Distribution Analysis',
      'Interactive Filtering by Year, Country & Industry',
      'Streamlit'
    ],
    githubUrl: 'https://github.com/mujtabashokat07-design/500-Ai-Companies-Analyses',
    liveDemoUrl: 'https://500-ai-companies-analyses-iiq9bza2dj5cm2ddcnv2hu.streamlit.app/',
    evidenceImages: [
      {
        url: '/assets/projects/500-ai-companies-1.webp',
        thumbnailUrl: '/assets/projects/500-ai-companies-1-thumb.webp',
        title: 'Enterprise AI Adoption Intelligence Grid',
        caption: 'Executive diagnostic telemetry evaluating 6,000 corporate cohorts with mean ROI index (20.25%), organizational maturity, and sector filters.',
        alt: 'Enterprise AI Adoption Intelligence Grid showing corporate cohorts count of 6000, mean ROI index of 20.25%, and maturity scale',
        isPrimary: true
      },
      {
        url: '/assets/projects/500-ai-companies-2.webp',
        thumbnailUrl: '/assets/projects/500-ai-companies-2-thumb.webp',
        title: 'Statistical Probability & ROI Density Profiles',
        caption: 'Statistical distribution profiles tracking ROI density, organizational maturity scales, and multi-country geographic market filters.',
        alt: 'Statistical probability and ROI density profiles interface with multi-nation filter controls and organizational maturity charts'
      },
      {
        url: '/assets/projects/500-ai-companies-3.webp',
        thumbnailUrl: '/assets/projects/500-ai-companies-3-thumb.webp',
        title: 'Multi-Dimensional Target Selection Controls',
        caption: 'Operational year selection controls (2020–2025) and industry sector vertical selectors (Automotive, Consumer Goods, Healthcare, Finance).',
        alt: 'Target selection controls interface with operational year buttons from 2020 to 2025 and sector vertical filters'
      }
    ],
    caseStudy: {
      openingSummary: 'AI adoption, ROI, maturity, categorical analysis, crosstabs, aggregations, and distribution analysis across companies, industries, and countries using descriptive statistics, categorical grouping, crosstabs, and interactive filtering.',
      section01Problem: {
        title: 'Exploratory Analysis of Enterprise AI Adoption',
        description: 'How does AI adoption vary across companies, industries, and countries? The project examines adoption stages, organizational maturity, and implementation patterns across business sectors in a synthetic dataset.'
      },
      section02Data: {
        datasetName: 'Synthetic Fortune 500-style AI Adoption Dataset (2020–2025)',
        description: 'A synthetic dataset modeling organizational AI adoption dimensions across sectors, business models, maturity levels, and geographic regions.',
        isSynthetic: true,
        pipeline: [
          'Raw synthetic enterprise records (2020–2025)',
          'Categorical grouping, cross-tabulations & aggregations',
          'Structured distribution matrices for interactive inspection'
        ]
      },
      section03Approach: {
        description: 'The workflow applies descriptive statistical aggregation, categorical grouping, crosstabs, and multi-variable distribution analysis to evaluate AI adoption, ROI, and maturity patterns.',
        workflowSteps: [
          'Data Ingestion',
          'Categorical Grouping',
          'Descriptive Statistics',
          'Crosstabs & Aggregations',
          'Distribution Analysis',
          'Interactive Filtering by Year, Country & Industry'
        ],
        keyMethod: 'Multi-faceted exploratory data analysis and categorical cross-tabulation of synthetic enterprise metrics'
      },
      section04Model: {
        description: 'Exploratory and descriptive analytical methodologies were utilized rather than predictive modeling to examine AI adoption, ROI, and maturity distributions across industries.',
        modelsUsed: [
          'Descriptive Statistical Summaries',
          'Categorical Grouping & Crosstabs',
          'Multi-Variable Distribution Analysis'
        ]
      },
      section05Evaluation: {
        concepts: [
          'Summary Statistics',
          'Crosstab Verification',
          'Sector Distributions',
          'Multi-Filter Validation'
        ],
        note: 'Analysis code and methodology details are included in the project repository.'
      },
      section06WhatIBuilt: {
        architectureSteps: [
          'Data Aggregation Engine',
          'Categorical Summary Pipeline',
          'Dynamic Distribution Charts',
          'Interactive Streamlit Dashboard'
        ],
        details: [
          'Categorical Summary Pipeline: Computes cross-industry adoption rates and maturity metrics using descriptive statistics and crosstabs.',
          'Dynamic Distribution Charts: Renders multi-sector distribution charts and categorical breakdowns.',
          'Streamlit Interface: Allows users to interactively filter by Year, Country, and Industry to explore adoption, ROI, and maturity patterns.'
        ]
      }
    }
  }
];
