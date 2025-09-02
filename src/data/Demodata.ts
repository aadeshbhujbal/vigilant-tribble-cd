import type {
  DocumentUpload,
  PythonProcessingRequest,
  ProcessingStatus,
} from '../types/questionnaire';

// Comprehensive demo data for middleware functionality

// Climate Questions
export const climateQuestions = [
  {
    id: 'q1',
    question:
      'What are the climate-related risks and opportunities identified in your annual report?',
    category: 'Risk Identification',
    subcategory: 'Physical and Transition Risks',
    required: true,
    helpText:
      'Include both physical risks (extreme weather, sea level rise) and transition risks (policy, technology, market changes)',
  },
  {
    id: 'q2',
    question:
      "Describe the impact of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.",
    category: 'Strategic Impact',
    subcategory: 'Business Integration',
    required: true,
    helpText:
      'Explain how climate considerations are integrated into business strategy, capital allocation, and financial planning',
  },
  {
    id: 'q3',
    question:
      "Describe the organization's processes for identifying and assessing climate-related risks.",
    category: 'Risk Management',
    subcategory: 'Processes and Methodologies',
    required: true,
    helpText:
      'Detail your risk identification workshops, assessment methodologies, and governance processes',
  },
  {
    id: 'q4',
    question:
      'Describe the metrics and targets used by the organization to assess climate-related risks.',
    category: 'Metrics and Targets',
    subcategory: 'Performance Measurement',
    required: true,
    helpText: 'Include specific metrics, targets, and timeframes for climate risk management',
  },
  {
    id: 'q5',
    question: "Describe the organization's climate scenario analysis methodology.",
    category: 'Scenario Analysis',
    subcategory: 'Methodology and Scenarios',
    required: true,
    helpText: 'Explain your scenario analysis approach, including RCP scenarios and stress testing',
  },
  {
    id: 'q6',
    question: "What is your organization's current carbon footprint and reduction targets?",
    category: 'Carbon Management',
    subcategory: 'Emissions and Targets',
    required: true,
    helpText: 'Include Scope 1, 2, and 3 emissions data and reduction targets',
  },
  {
    id: 'q7',
    question:
      'How does your organization assess climate-related financial risks in your investment portfolio?',
    category: 'Financial Risk',
    subcategory: 'Portfolio Assessment',
    required: false,
    helpText: 'Describe your approach to climate risk assessment in investment decisions',
  },
  {
    id: 'q8',
    question: 'What climate adaptation measures has your organization implemented?',
    category: 'Adaptation',
    subcategory: 'Resilience Measures',
    required: false,
    helpText: 'Include infrastructure, operational, and strategic adaptation measures',
  },
  {
    id: 'q9',
    question: 'How do you engage with stakeholders on climate-related issues?',
    category: 'Stakeholder Engagement',
    subcategory: 'Communication and Collaboration',
    required: false,
    helpText: 'Describe your stakeholder engagement processes and communication strategies',
  },
  {
    id: 'q10',
    question: 'What climate-related research and development initiatives are you pursuing?',
    category: 'Innovation',
    subcategory: 'R&D and Technology',
    required: false,
    helpText: 'Include details about climate-focused innovation projects and partnerships',
  },
];

// Climate Answers
export const climateAnswers = [
  {
    questionId: 'q1',
    response: `Green Energy Corp has identified comprehensive climate-related risks and opportunities:

**Short-term (1-3 years):**
• Physical risks: Extreme weather events affecting operations ($2-5M annual impact)
• Opportunities: Government renewable incentives (15% revenue increase projected)

**Medium-term (4-10 years):**
• Transition risks: Stranded fossil fuel assets ($12M book value at risk)
• Opportunities: Climate adaptation services ($50M new revenue stream)

**Long-term (10+ years):**
• Physical risks: Sea level rise requiring $25M protective infrastructure
• Opportunities: Green hydrogen market leadership ($200M revenue potential by 2035)`,
    confidence: 0.89,
    citations: [
      'Annual Report 2023, Page 45, Section 4.2',
      'TCFD Disclosure 2023, Page 12, Strategic Planning',
    ],
    processingTime: 4.2,
  },
  {
    questionId: 'q2',
    response: `Climate considerations are integrated across all business functions:

**Business Impact:**
• Revenue diversification: 40% from climate services (up from 15% in 2020)
• Operational resilience: $8M invested, 35% downtime reduction
• Market premium: 25% green bond pricing advantage

**Strategic Integration:**
• Capital allocation: 60% of $100M capex for climate-resilient tech
• R&D focus: 70% of innovation budget on climate solutions
• Geographic expansion prioritizes climate-stable regions`,
    confidence: 0.91,
    citations: [
      'Annual Report 2023, Page 67, Financial Strategy',
      'Strategic Plan 2023-2028, Climate Integration Section',
    ],
    processingTime: 5.1,
  },
  {
    questionId: 'q3',
    response: `Multi-layered climate risk identification and assessment process:

**Identification Process:**
• Quarterly cross-functional climate risk workshops
• External data: NOAA, IPCC scenarios, regional climate models
• Stakeholder engagement: suppliers, customers, communities
• Scenario analysis using RCP 4.5 and RCP 8.5 pathways

**Assessment Methodology:**
• Monte Carlo simulations for physical risk modeling
• 20-year NPV calculations for transition risks
• 1-5 scale probability-weighted risk scoring`,
    confidence: 0.87,
    citations: [
      'TCFD Disclosure 2023, Page 8, Risk Management',
      'Climate Risk Policy 2023, Section 3.2',
    ],
    processingTime: 3.8,
  },
  {
    questionId: 'q4',
    response: `Comprehensive climate metrics aligned with science-based targets:

**Physical Risk Metrics:**
• Weather-related downtime: Target <2% annually (2023: 1.7%)
• Infrastructure resilience score: Target >85% (2023: 87%)
• Emergency response time: Target <4 hours (2023: 3.2 hours)

**Transition Risk Metrics:**
• Carbon intensity: 15 tCO2e/MWh (Target: 10 tCO2e/MWh by 2025)
• Renewable energy percentage: 78% (Target: 90% by 2026)`,
    confidence: 0.93,
    citations: [
      'Annual Report 2023, Page 89, Performance Metrics',
      'Sustainability Report 2023, Climate Targets Section',
    ],
    processingTime: 4.7,
  },
  {
    questionId: 'q5',
    response: `Advanced climate scenario analysis methodology:

**Scenario Framework:**
• IPCC RCP 2.6 (optimistic), RCP 4.5 (moderate), RCP 8.5 (pessimistic)
• Time horizons: 2030, 2050, 2100
• Geographic granularity: Regional and facility-specific analysis

**Analysis Tools:**
• Climate model integration with financial models
• Monte Carlo simulations with 10,000+ iterations
• Stress testing under extreme climate scenarios`,
    confidence: 0.85,
    citations: [
      'Climate Scenario Analysis 2023, Methodology Document',
      'TCFD Disclosure 2023, Scenario Analysis Section',
    ],
    processingTime: 6.2,
  },
  {
    questionId: 'q6',
    response: `Current carbon footprint and ambitious reduction targets:

**2023 Emissions:**
• Scope 1: 45,000 tCO2e (direct operations)
• Scope 2: 120,000 tCO2e (purchased electricity)
• Scope 3: 280,000 tCO2e (supply chain and use of products)

**Reduction Targets:**
• 2025: 30% reduction from 2020 baseline
• 2030: 60% reduction from 2020 baseline
• 2050: Net-zero emissions`,
    confidence: 0.94,
    citations: [
      'Sustainability Report 2023, Emissions Data Section',
      'Carbon Reduction Plan 2023-2050',
    ],
    processingTime: 3.5,
  },
  {
    questionId: 'q7',
    response: `Comprehensive climate risk assessment in investment portfolio:

**Portfolio Analysis:**
• Climate risk scoring for all investments (>$500M portfolio)
• Carbon footprint tracking and reduction targets
• Climate-aligned investment screening criteria

**Risk Mitigation:**
• Divestment from high-carbon assets ($25M completed in 2023)
• Investment in climate solutions ($75M allocated)
• Engagement with portfolio companies on climate disclosure`,
    confidence: 0.88,
    citations: ['Investment Policy 2023, Climate Risk Section', 'Portfolio Climate Report 2023'],
    processingTime: 4.8,
  },
  {
    questionId: 'q8',
    response: `Multi-faceted climate adaptation measures:

**Infrastructure Adaptation:**
• Flood protection systems at coastal facilities ($15M investment)
• Heat-resistant equipment upgrades ($8M investment)
• Water conservation systems ($5M investment)

**Operational Adaptation:**
• Flexible work arrangements during extreme weather
• Supply chain diversification for climate resilience
• Emergency response protocols for climate events`,
    confidence: 0.82,
    citations: [
      'Climate Action Plan 2023, Adaptation Section',
      'Infrastructure Resilience Report 2023',
    ],
    processingTime: 4.1,
  },
  {
    questionId: 'q9',
    response: `Comprehensive stakeholder engagement on climate issues:

**Internal Stakeholders:**
• Quarterly climate briefings for board and executives
• Annual climate training for all employees
• Climate champions program across departments

**External Stakeholders:**
• Regular engagement with investors on climate strategy
• Collaboration with suppliers on emissions reduction
• Community partnerships for climate resilience`,
    confidence: 0.86,
    citations: ['Stakeholder Engagement Policy 2023', 'Climate Communication Strategy 2023'],
    processingTime: 3.9,
  },
  {
    questionId: 'q10',
    response: `Innovative climate R&D initiatives:

**Current Projects:**
• Advanced energy storage systems ($12M investment)
• Carbon capture and utilization technology ($8M investment)
• Climate-resilient crop development ($5M investment)

**Partnerships:**
• University research collaborations (5 active partnerships)
• Industry consortia participation (3 major initiatives)
• Government-funded climate innovation programs`,
    confidence: 0.84,
    citations: ['R&D Strategy 2023, Climate Innovation Section', 'Partnership Portfolio 2023'],
    processingTime: 4.3,
  },
];

// Document Uploads
export const demoDocumentUploads: DocumentUpload[] = [
  {
    id: 'doc-001',
    fileName: 'annual_report_2023.pdf',
    fileType: 'pdf',
    fileSize: 2048576, // 2MB
    uploadedAt: new Date('2024-01-15T10:00:00Z'),
    status: 'completed',
    pythonJobId: 'python-job-001',
  },
  {
    id: 'doc-002',
    fileName: 'tcfd_disclosure_2023.pdf',
    fileType: 'pdf',
    fileSize: 1536000, // 1.5MB
    uploadedAt: new Date('2024-01-15T10:05:00Z'),
    status: 'completed',
    pythonJobId: 'python-job-002',
  },
  {
    id: 'doc-003',
    fileName: 'sustainability_report_2023.docx',
    fileType: 'docx',
    fileSize: 1024000, // 1MB
    uploadedAt: new Date('2024-01-15T10:10:00Z'),
    status: 'completed',
    pythonJobId: 'python-job-003',
  },
  {
    id: 'doc-004',
    fileName: 'climate_action_plan_2023.pdf',
    fileType: 'pdf',
    fileSize: 3072000, // 3MB
    uploadedAt: new Date('2024-01-15T10:15:00Z'),
    status: 'completed',
    pythonJobId: 'python-job-004',
  },
  {
    id: 'doc-005',
    fileName: 'investment_policy_2023.pdf',
    fileType: 'pdf',
    fileSize: 1792000, // 1.75MB
    uploadedAt: new Date('2024-01-15T10:20:00Z'),
    status: 'processing',
    pythonJobId: 'python-job-005',
  },
  {
    id: 'doc-006',
    fileName: 'rd_strategy_2023.docx',
    fileType: 'docx',
    fileSize: 2048000, // 2MB
    uploadedAt: new Date('2024-01-15T10:25:00Z'),
    status: 'uploaded',
  },
];

// Processing Requests
export const demoProcessingRequests: PythonProcessingRequest[] = [
  {
    id: 'req-001',
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    organization: 'green-energy-corp',
    requestedAt: new Date('2024-01-15T10:00:00Z'),
    status: 'completed',
    pythonResponse: {
      questions: [
        'What are the climate-related risks identified in your annual report?',
        'How do climate considerations impact your business strategy?',
        'What is your current carbon footprint?',
        'What adaptation measures have you implemented?',
        'How do you engage with stakeholders on climate issues?',
      ],
      responses: [
        'Our annual report identifies extreme weather events as a key physical risk...',
        'Climate considerations drive 60% of our capital allocation decisions...',
        'Our current carbon footprint is 45,000 tonnes CO2e...',
        'We have implemented flood protection measures at our coastal facilities...',
        'We engage quarterly with board and executives on climate strategy...',
      ],
      citations: [
        'Annual Report 2023, Page 45, Section 4.2',
        'TCFD Disclosure 2023, Page 12, Strategic Planning',
        'Sustainability Report 2023, Page 23, Emissions Data',
        'Climate Action Plan 2023, Page 15, Adaptation Strategies',
        'Stakeholder Engagement Policy 2023, Section 2.1',
      ],
      processingTime: 45.2,
    },
  },
  {
    id: 'req-002',
    documentIds: ['doc-004'],
    organization: 'green-energy-corp',
    requestedAt: new Date('2024-01-15T10:15:00Z'),
    status: 'completed',
    pythonResponse: {
      questions: [
        'What climate adaptation measures has your organization implemented?',
        'What are your climate resilience strategies?',
      ],
      responses: [
        'We have implemented comprehensive flood protection and heat-resistant systems...',
        'Our resilience strategies include infrastructure upgrades and operational flexibility...',
      ],
      citations: [
        'Climate Action Plan 2023, Adaptation Section, Pages 15-28',
        'Climate Action Plan 2023, Resilience Section, Pages 29-42',
      ],
      processingTime: 32.8,
    },
  },
  {
    id: 'req-003',
    documentIds: ['doc-005'],
    organization: 'green-energy-corp',
    requestedAt: new Date('2024-01-15T10:20:00Z'),
    status: 'processing',
  },
  {
    id: 'req-004',
    documentIds: ['doc-006'],
    organization: 'green-energy-corp',
    requestedAt: new Date('2024-01-15T10:25:00Z'),
    status: 'pending',
  },
];

// Processing Statuses
export const demoProcessingStatuses: ProcessingStatus[] = [
  {
    requestId: 'req-001',
    status: 'completed',
    progress: 100,
    currentStep: 'Processing completed',
    lastUpdated: new Date('2024-01-15T10:45:00Z'),
  },
  {
    requestId: 'req-002',
    status: 'completed',
    progress: 100,
    currentStep: 'Processing completed',
    lastUpdated: new Date('2024-01-15T10:47:00Z'),
  },
  {
    requestId: 'req-003',
    status: 'processing',
    progress: 65,
    currentStep: 'Generating responses',
    estimatedTimeRemaining: 180,
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
  },
  {
    requestId: 'req-004',
    status: 'pending',
    progress: 0,
    currentStep: 'Queued for processing',
    lastUpdated: new Date('2024-01-15T10:25:00Z'),
  },
];
