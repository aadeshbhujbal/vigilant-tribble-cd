
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
  {
    id: 'q11',
    question: 'How does your organization assess and manage climate-related supply chain risks?',
    category: 'Supply Chain',
    subcategory: 'Risk Assessment',
    required: true,
    helpText:
      'Describe your approach to identifying and mitigating climate risks in your supply chain',
  },
  {
    id: 'q12',
    question: 'What governance structures are in place for climate risk oversight?',
    category: 'Governance',
    subcategory: 'Board and Management',
    required: true,
    helpText: 'Detail board-level oversight, management responsibilities, and reporting structures',
  },
  {
    id: 'q13',
    question: 'How do you measure and report on climate-related financial impacts?',
    category: 'Financial Reporting',
    subcategory: 'Climate Finance',
    required: true,
    helpText: 'Include methodologies for quantifying climate impacts on financial statements',
  },
  {
    id: 'q14',
    question: 'What climate-related insurance coverage does your organization maintain?',
    category: 'Risk Transfer',
    subcategory: 'Insurance and Hedging',
    required: false,
    helpText: 'Describe insurance policies, coverage limits, and risk transfer mechanisms',
  },
  {
    id: 'q15',
    question: 'How do you ensure climate risk considerations in your procurement processes?',
    category: 'Procurement',
    subcategory: 'Sustainable Sourcing',
    required: false,
    helpText: 'Detail supplier screening, green procurement policies, and sustainability criteria',
  },
  {
    id: 'q16',
    question: 'What climate-related training and capacity building programs do you offer?',
    category: 'Human Resources',
    subcategory: 'Training and Development',
    required: false,
    helpText: 'Include employee training programs, skill development, and awareness initiatives',
  },
  {
    id: 'q17',
    question: 'How do you assess climate risks in your real estate and facilities portfolio?',
    category: 'Asset Management',
    subcategory: 'Physical Assets',
    required: false,
    helpText:
      'Describe property risk assessments, location analysis, and facility resilience measures',
  },
  {
    id: 'q18',
    question: 'What climate-related regulatory compliance requirements do you monitor?',
    category: 'Compliance',
    subcategory: 'Regulatory Requirements',
    required: true,
    helpText:
      'List relevant regulations, reporting obligations, and compliance monitoring processes',
  },
  {
    id: 'q19',
    question: 'How do you engage with climate-related industry initiatives and standards?',
    category: 'Industry Engagement',
    subcategory: 'Standards and Frameworks',
    required: false,
    helpText:
      'Include participation in industry groups, standards adoption, and best practice sharing',
  },
  {
    id: 'q20',
    question: 'What climate-related data management and reporting systems do you use?',
    category: 'Data Management',
    subcategory: 'Systems and Technology',
    required: false,
    helpText: 'Describe data collection, storage, analysis, and reporting infrastructure',
  },
  {
    id: 'q21',
    question: 'How do you assess climate risks in your product and service offerings?',
    category: 'Product Strategy',
    subcategory: 'Climate-Aligned Products',
    required: false,
    helpText:
      'Detail product lifecycle assessments, climate impact evaluations, and green product development',
  },
  {
    id: 'q22',
    question: 'What climate-related partnerships and collaborations do you maintain?',
    category: 'Partnerships',
    subcategory: 'External Collaboration',
    required: false,
    helpText: 'Include academic partnerships, industry collaborations, and NGO relationships',
  },
  {
    id: 'q23',
    question: 'How do you assess and manage climate risks in your technology infrastructure?',
    category: 'Technology',
    subcategory: 'IT and Digital',
    required: false,
    helpText:
      'Describe data center resilience, cloud strategy, and digital infrastructure climate considerations',
  },
  {
    id: 'q24',
    question: 'What climate-related performance incentives are included in executive compensation?',
    category: 'Compensation',
    subcategory: 'Executive Pay',
    required: false,
    helpText: 'Detail climate-related KPIs, performance metrics, and incentive structures',
  },
  {
    id: 'q25',
    question: 'How do you assess climate risks in your customer base and market segments?',
    category: 'Market Analysis',
    subcategory: 'Customer Risk',
    required: false,
    helpText:
      'Describe customer vulnerability assessments, market impact analysis, and demand forecasting',
  },
  {
    id: 'q26',
    question: 'What climate-related due diligence processes do you follow for M&A activities?',
    category: 'Mergers & Acquisitions',
    subcategory: 'Due Diligence',
    required: false,
    helpText:
      'Detail climate risk assessment in acquisition targets, integration planning, and post-merger monitoring',
  },
  {
    id: 'q27',
    question: 'How do you manage climate risks in your international operations?',
    category: 'International Operations',
    subcategory: 'Global Risk Management',
    required: false,
    helpText:
      'Include country-specific risk assessments, regulatory variations, and cross-border considerations',
  },
  {
    id: 'q28',
    question: 'What climate-related innovation and technology adoption strategies do you pursue?',
    category: 'Technology Strategy',
    subcategory: 'Innovation Management',
    required: false,
    helpText: 'Detail technology roadmaps, innovation pipelines, and climate solution development',
  },
  {
    id: 'q29',
    question: 'How do you assess climate risks in your intellectual property and R&D investments?',
    category: 'Intellectual Property',
    subcategory: 'Innovation Assets',
    required: false,
    helpText:
      'Describe IP risk assessments, R&D portfolio analysis, and innovation asset protection',
  },
  {
    id: 'q30',
    question: 'What climate-related crisis management and business continuity plans do you have?',
    category: 'Crisis Management',
    subcategory: 'Business Continuity',
    required: true,
    helpText:
      'Detail emergency response plans, business continuity procedures, and climate event protocols',
  },
  {
    id: 'q31',
    question: 'How do you assess climate risks in your debt and equity financing?',
    category: 'Financing',
    subcategory: 'Capital Structure',
    required: false,
    helpText: 'Include green financing, climate-linked loans, and sustainable investment criteria',
  },
  {
    id: 'q32',
    question: 'What climate-related tax implications and opportunities do you consider?',
    category: 'Tax Strategy',
    subcategory: 'Climate Tax',
    required: false,
    helpText:
      'Detail carbon pricing impacts, green tax incentives, and climate-related tax planning',
  },
  {
    id: 'q33',
    question: 'How do you assess climate risks in your brand reputation and stakeholder relations?',
    category: 'Reputation Management',
    subcategory: 'Stakeholder Relations',
    required: false,
    helpText:
      'Include brand risk assessments, stakeholder sentiment analysis, and reputation monitoring',
  },
  {
    id: 'q34',
    question: 'What climate-related legal and litigation risks do you monitor?',
    category: 'Legal Risk',
    subcategory: 'Climate Litigation',
    required: false,
    helpText:
      'Detail legal exposure assessments, litigation monitoring, and regulatory enforcement risks',
  },
  {
    id: 'q35',
    question:
      'How do you assess climate risks in your talent acquisition and retention strategies?',
    category: 'Talent Management',
    subcategory: 'Workforce Planning',
    required: false,
    helpText:
      'Include talent risk assessments, skill gap analysis, and climate-related workforce planning',
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
  {
    questionId: 'q11',
    response: `Comprehensive supply chain climate risk assessment:

**Risk Identification:**
• Supplier climate vulnerability mapping across 500+ vendors
• Geographic risk assessment for critical supply routes
• Climate impact analysis on raw material availability

**Mitigation Strategies:**
• Supplier climate resilience requirements in contracts
• Alternative supplier development in climate-stable regions
• Supply chain diversification to reduce concentration risk`,
    confidence: 0.87,
    citations: [
      'Supply Chain Risk Assessment 2023, Page 15, Climate Analysis',
      'Vendor Management Policy 2023, Climate Requirements Section',
    ],
    processingTime: 4.1,
  },
  {
    questionId: 'q12',
    response: `Robust climate governance structure:

**Board Level:**
• Climate Risk Committee with quarterly oversight
• Board-level climate expertise and training
• Climate risk reporting to board every quarter

**Management Level:**
• Chief Sustainability Officer reporting to CEO
• Climate risk management team across all business units
• Climate risk integration in performance reviews`,
    confidence: 0.92,
    citations: [
      'Corporate Governance Policy 2023, Climate Oversight Section',
      'Board Charter 2023, Climate Risk Committee Terms',
    ],
    processingTime: 3.8,
  },
  {
    questionId: 'q13',
    response: `Advanced climate financial impact measurement:

**Methodology:**
• Scenario-based financial modeling using IPCC pathways
• Monte Carlo simulations for risk quantification
• 20-year NPV calculations for climate impacts

**Reporting Framework:**
• TCFD-aligned financial disclosures
• Climate-related financial statement notes
• Integrated climate and financial reporting`,
    confidence: 0.89,
    citations: [
      'Financial Reporting Framework 2023, Climate Integration',
      'TCFD Disclosure 2023, Financial Impact Section',
    ],
    processingTime: 5.2,
  },
  {
    questionId: 'q14',
    response: `Comprehensive climate insurance coverage:

**Coverage Details:**
• Property insurance: $500M coverage for climate-related damage
• Business interruption: $200M coverage for climate events
• Directors & Officers: Climate-related liability coverage

**Risk Transfer:**
• Catastrophe bonds for extreme weather events
• Parametric insurance for temperature and precipitation
• Reinsurance partnerships for climate risk sharing`,
    confidence: 0.85,
    citations: [
      'Insurance Portfolio 2023, Climate Coverage Summary',
      'Risk Transfer Strategy 2023, Climate Insurance Section',
    ],
    processingTime: 4.0,
  },
  {
    questionId: 'q15',
    response: `Climate-integrated procurement processes:

**Supplier Screening:**
• Climate risk assessment for all new suppliers
• Carbon footprint requirements in procurement criteria
• Sustainability scorecards for supplier evaluation

**Green Procurement:**
• 80% of purchases from climate-certified suppliers
• Renewable energy requirements for service providers
• Circular economy principles in procurement decisions`,
    confidence: 0.88,
    citations: [
      'Procurement Policy 2023, Climate Requirements',
      'Supplier Sustainability Program 2023, Green Procurement',
    ],
    processingTime: 3.9,
  },
  {
    questionId: 'q16',
    response: `Comprehensive climate training programs:

**Employee Training:**
• Annual climate awareness training for all employees
• Climate risk management certification program
• Climate scenario analysis workshops for managers

**Capacity Building:**
• Climate expertise development program
• External climate training partnerships
• Climate champions network across departments`,
    confidence: 0.86,
    citations: [
      'Training Program 2023, Climate Education Section',
      'Human Resources Policy 2023, Climate Training Requirements',
    ],
    processingTime: 4.2,
  },
  {
    questionId: 'q17',
    response: `Strategic real estate climate risk assessment:

**Property Analysis:**
• Climate vulnerability assessment for all facilities
• Location-based risk scoring for new acquisitions
• Physical climate risk modeling for existing properties

**Resilience Measures:**
• Flood protection systems at coastal facilities
• Heat-resistant building materials and cooling systems
• Emergency response plans for climate events`,
    confidence: 0.84,
    citations: [
      'Real Estate Portfolio 2023, Climate Risk Assessment',
      'Facility Management Policy 2023, Climate Resilience',
    ],
    processingTime: 4.5,
  },
  {
    questionId: 'q18',
    response: `Comprehensive regulatory compliance monitoring:

**Key Regulations:**
• SEC Climate Disclosure Rules compliance
• EU CSRD reporting requirements
• State-level climate disclosure mandates

**Compliance Framework:**
• Regulatory change monitoring system
• Compliance training for relevant staff
• Regular compliance audits and reporting`,
    confidence: 0.91,
    citations: [
      'Compliance Framework 2023, Climate Regulations',
      'Regulatory Monitoring System 2023, Climate Requirements',
    ],
    processingTime: 4.3,
  },
  {
    questionId: 'q19',
    response: `Active industry engagement on climate issues:

**Industry Initiatives:**
• TCFD implementation and best practice sharing
• Science Based Targets initiative participation
• Climate Action 100+ investor engagement

**Standards Adoption:**
• GRI Standards for climate reporting
• SASB Standards for climate disclosure
• Industry-specific climate frameworks`,
    confidence: 0.87,
    citations: [
      'Industry Engagement Report 2023, Climate Initiatives',
      'Standards Adoption Policy 2023, Climate Frameworks',
    ],
    processingTime: 4.1,
  },
  {
    questionId: 'q20',
    response: `Advanced climate data management systems:

**Data Infrastructure:**
• Centralized climate data warehouse
• Real-time climate risk monitoring dashboards
• Automated climate data collection and validation

**Reporting Systems:**
• Integrated climate and financial reporting platform
• Automated TCFD report generation
• Climate data visualization and analytics tools`,
    confidence: 0.89,
    citations: [
      'Data Management Strategy 2023, Climate Systems',
      'Technology Infrastructure 2023, Climate Data Platform',
    ],
    processingTime: 4.7,
  },
  {
    questionId: 'q21',
    response: `Climate-aligned product strategy:

**Product Assessment:**
• Lifecycle climate impact analysis for all products
• Climate risk assessment in product development
• Green product certification and labeling

**Innovation Focus:**
• Climate solution product development
• Sustainable product design principles
• Climate-positive product portfolio growth`,
    confidence: 0.85,
    citations: [
      'Product Strategy 2023, Climate Integration',
      'Innovation Roadmap 2023, Climate Solutions',
    ],
    processingTime: 4.4,
  },
  {
    questionId: 'q22',
    response: `Strategic climate partnerships:

**Academic Partnerships:**
• University research collaborations on climate solutions
• Climate innovation lab partnerships
• Student climate research programs

**Industry Collaborations:**
• Climate technology consortium participation
• Cross-industry climate best practice sharing
• Joint climate solution development projects`,
    confidence: 0.83,
    citations: [
      'Partnership Portfolio 2023, Climate Collaborations',
      'Strategic Alliances 2023, Climate Innovation',
    ],
    processingTime: 4.0,
  },
  {
    questionId: 'q23',
    response: `Climate-resilient technology infrastructure:

**Data Center Strategy:**
• Renewable energy-powered data centers
• Climate-resilient server infrastructure
• Disaster recovery for climate events

**Digital Infrastructure:**
• Cloud-based climate risk monitoring
• Climate data analytics platforms
• Digital climate reporting systems`,
    confidence: 0.88,
    citations: [
      'Technology Strategy 2023, Climate Infrastructure',
      'IT Infrastructure 2023, Climate Resilience',
    ],
    processingTime: 4.2,
  },
  {
    questionId: 'q24',
    response: `Climate-linked executive compensation:

**Performance Metrics:**
• Climate risk reduction targets (30% weight)
• Carbon footprint reduction goals (25% weight)
• Climate innovation metrics (20% weight)

**Incentive Structure:**
• Annual climate performance bonuses
• Long-term climate achievement awards
• Climate leadership recognition programs`,
    confidence: 0.86,
    citations: [
      'Executive Compensation Policy 2023, Climate Metrics',
      'Performance Management 2023, Climate Incentives',
    ],
    processingTime: 3.9,
  },
  {
    questionId: 'q25',
    response: `Customer climate risk assessment:

**Market Analysis:**
• Customer climate vulnerability mapping
• Climate impact on customer demand patterns
• Climate risk in customer segments

**Risk Mitigation:**
• Climate-resilient customer service delivery
• Climate adaptation support for customers
• Climate risk communication to customers`,
    confidence: 0.84,
    citations: [
      'Customer Risk Assessment 2023, Climate Analysis',
      'Market Strategy 2023, Climate Considerations',
    ],
    processingTime: 4.3,
  },
  {
    questionId: 'q26',
    response: `Climate-focused M&A due diligence:

**Due Diligence Process:**
• Climate risk assessment for acquisition targets
• Climate liability evaluation in M&A transactions
• Climate integration planning for acquisitions

**Post-Merger Integration:**
• Climate risk integration in acquired companies
• Climate performance monitoring post-acquisition
• Climate culture alignment in mergers`,
    confidence: 0.87,
    citations: [
      'M&A Policy 2023, Climate Due Diligence',
      'Integration Framework 2023, Climate Considerations',
    ],
    processingTime: 4.5,
  },
  {
    questionId: 'q27',
    response: `Global climate risk management:

**Country-Specific Analysis:**
• Climate risk assessment by country of operation
• Regulatory climate requirements by jurisdiction
• Climate adaptation strategies by region

**Cross-Border Considerations:**
• International climate reporting requirements
• Cross-border climate risk transfer
• Global climate risk coordination`,
    confidence: 0.89,
    citations: [
      'Global Risk Management 2023, Climate Analysis',
      'International Operations 2023, Climate Strategy',
    ],
    processingTime: 4.6,
  },
  {
    questionId: 'q28',
    response: `Climate innovation and technology strategy:

**Innovation Pipeline:**
• Climate technology development roadmap
• Climate solution R&D investment priorities
• Climate innovation partnership strategy

**Technology Adoption:**
• Climate technology integration across operations
• Climate solution pilot programs
• Climate technology scaling initiatives`,
    confidence: 0.85,
    citations: [
      'Innovation Strategy 2023, Climate Technology',
      'R&D Portfolio 2023, Climate Solutions',
    ],
    processingTime: 4.2,
  },
  {
    questionId: 'q29',
    response: `Climate risk in intellectual property:

**IP Risk Assessment:**
• Climate impact on R&D investments
• Climate risk in patent portfolio
• Climate technology IP protection strategy

**Innovation Protection:**
• Climate solution patent filing strategy
• Climate technology trade secret protection
• Climate innovation IP licensing`,
    confidence: 0.83,
    citations: [
      'IP Strategy 2023, Climate Considerations',
      'Innovation Protection 2023, Climate Technology',
    ],
    processingTime: 4.1,
  },
  {
    questionId: 'q30',
    response: `Comprehensive climate crisis management:

**Emergency Response:**
• Climate event emergency response protocols
• Climate crisis communication plans
• Climate event business continuity procedures

**Business Continuity:**
• Climate-resilient business operations
• Climate event recovery planning
• Climate crisis management training`,
    confidence: 0.90,
    citations: [
      'Crisis Management Plan 2023, Climate Events',
      'Business Continuity 2023, Climate Resilience',
    ],
    processingTime: 4.4,
  },
  {
    questionId: 'q31',
    response: `Climate-integrated financing strategy:

**Green Financing:**
• Green bond issuance for climate projects
• Climate-linked loan facilities
• Sustainable investment criteria

**Capital Structure:**
• Climate risk in debt and equity decisions
• Climate-aligned investor relations
• Climate performance in capital markets`,
    confidence: 0.88,
    citations: [
      'Financing Strategy 2023, Climate Integration',
      'Capital Markets 2023, Climate Performance',
    ],
    processingTime: 4.3,
  },
  {
    questionId: 'q32',
    response: `Climate tax strategy and opportunities:

**Tax Implications:**
• Carbon pricing impact on tax obligations
• Climate-related tax incentives and credits
• Climate risk in tax planning

**Tax Opportunities:**
• Green tax credit optimization
• Climate investment tax benefits
• Climate-related tax-efficient structures`,
    confidence: 0.86,
    citations: [
      'Tax Strategy 2023, Climate Considerations',
      'Tax Planning 2023, Climate Opportunities',
    ],
    processingTime: 4.0,
  },
  {
    questionId: 'q33',
    response: `Climate reputation and stakeholder management:

**Reputation Monitoring:**
• Climate reputation risk assessment
• Stakeholder climate sentiment analysis
• Climate communication strategy

**Stakeholder Relations:**
• Climate engagement with key stakeholders
• Climate transparency and disclosure
• Climate leadership positioning`,
    confidence: 0.87,
    citations: [
      'Reputation Management 2023, Climate Strategy',
      'Stakeholder Relations 2023, Climate Engagement',
    ],
    processingTime: 4.2,
  },
  {
    questionId: 'q34',
    response: `Climate legal and litigation risk management:

**Legal Risk Assessment:**
• Climate litigation exposure analysis
• Climate regulatory enforcement risk
• Climate liability assessment

**Risk Mitigation:**
• Climate legal compliance monitoring
• Climate litigation defense strategy
• Climate legal risk insurance coverage`,
    confidence: 0.89,
    citations: [
      'Legal Risk Assessment 2023, Climate Analysis',
      'Litigation Strategy 2023, Climate Defense',
    ],
    processingTime: 4.5,
  },
  {
    questionId: 'q35',
    response: `Climate-integrated talent management:

**Workforce Planning:**
• Climate skill requirements analysis
• Climate talent acquisition strategy
• Climate workforce development programs

**Talent Retention:**
• Climate-focused employee engagement
• Climate career development opportunities
• Climate culture and values alignment`,
    confidence: 0.84,
    citations: [
      'Talent Strategy 2023, Climate Integration',
      'Workforce Planning 2023, Climate Skills',
    ],
    processingTime: 4.1,
  },
];

