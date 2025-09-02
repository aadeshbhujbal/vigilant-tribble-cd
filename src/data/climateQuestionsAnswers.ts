// src/data/climateQuestionsAnswers.ts
export interface ClimateQA {
  id: string;
  question: string;
  category: string;
  extractedAnswer: {
    response: string;
    confidence: number;
    citations: Citation[];
    explanation: string;
    processingDetails: ProcessingDetails;
    needsReprocessing?: boolean;
    suggestedAction?: string;
  };
}

export interface Citation {
  documentId: string;
  documentName: string;
  pageNumber: number;
  section: string;
  excerpt: string;
  relevanceScore: number;
}

export interface ProcessingDetails {
  chunksAnalyzed: number;
  retrievalMethod: string;
  rerankerScore: number;
  processingTime: number;
}

export const demoClimateQA: ClimateQA[] = [
  {
    id: 'q1',
    question:
      'Describe the climate-related risks and opportunities the organization has identified over the short, medium, and long term.',
    category: 'Risk Identification',
    extractedAnswer: {
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
        {
          documentId: 'doc_1',
          documentName: 'annual_report_2023.pdf',
          pageNumber: 45,
          section: 'Climate Risk Assessment',
          excerpt:
            'Extreme weather events cost approximately $2-5 million annually in operational disruptions...',
          relevanceScore: 0.92,
        },
        {
          documentId: 'doc_2',
          documentName: 'tcfd_disclosure_2023.pdf',
          pageNumber: 12,
          section: 'Strategic Planning',
          excerpt:
            'Sea level rise scenarios require estimated $25 million in infrastructure protection...',
          relevanceScore: 0.87,
        },
      ],
      explanation:
        'High-confidence answer from 8 document chunks using dense + sparse retrieval with cross-encoder reranking.',
      processingDetails: {
        chunksAnalyzed: 8,
        retrievalMethod: 'Dense + Sparse',
        rerankerScore: 0.89,
        processingTime: 4.2,
      },
    },
  },

  {
    id: 'q2',
    question:
      "Describe the impact of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.",
    category: 'Strategic Impact',
    extractedAnswer: {
      response: `Climate considerations are integrated across all business functions:

**Business Impact:**
• Revenue diversification: 40% from climate services (up from 15% in 2020)
• Operational resilience: $8M invested, 35% downtime reduction
• Market premium: 25% green bond pricing advantage

**Strategic Integration:**
• Capital allocation: 60% of $100M capex for climate-resilient tech
• R&D focus: 70% of innovation budget on climate solutions
• Geographic expansion prioritizes climate-stable regions

**Financial Planning:**
• Annual reserves: $15M for extreme weather impacts
• Transition investments: $50M over 5 years for asset retirement
• Growth funding: $75M for green hydrogen and carbon capture`,

      confidence: 0.91,
      citations: [
        {
          documentId: 'doc_1',
          documentName: 'annual_report_2023.pdf',
          pageNumber: 67,
          section: 'Financial Strategy',
          excerpt:
            'Climate drives 60% of capital allocation with $100M annual resilient infrastructure investment...',
          relevanceScore: 0.94,
        },
      ],
      explanation:
        'Comprehensive answer from financial and strategic sections with consistent cross-document validation.',
      processingDetails: {
        chunksAnalyzed: 12,
        retrievalMethod: 'Dense + Sparse',
        rerankerScore: 0.91,
        processingTime: 5.1,
      },
    },
  },

  {
    id: 'q3',
    question:
      "Describe the organization's processes for identifying and assessing climate-related risks.",
    category: 'Risk Management',
    extractedAnswer: {
      response: `Multi-layered climate risk identification and assessment process:

**Identification Process:**
• Quarterly cross-functional climate risk workshops
• External data: NOAA, IPCC scenarios, regional climate models
• Stakeholder engagement: suppliers, customers, communities
• Scenario analysis using RCP 4.5 and RCP 8.5 pathways

**Assessment Methodology:**
• Monte Carlo simulations for physical risk modeling
• 20-year NPV calculations for transition risks
• 1-5 scale probability-weighted risk scoring
• Geographic risk mapping across 47 facilities

**Governance:**
• Quarterly board climate risk committee reviews
• Annual third-party risk assessments
• Enterprise risk management integration
• Monthly climate indicator monitoring`,

      confidence: 0.87,
      citations: [
        {
          documentId: 'doc_2',
          documentName: 'tcfd_disclosure_2023.pdf',
          pageNumber: 8,
          section: 'Risk Management',
          excerpt:
            'Quarterly workshops and RCP scenario analysis form our risk identification foundation...',
          relevanceScore: 0.91,
        },
      ],
      explanation:
        'Process details from risk management and TCFD documentation with clear methodology description.',
      processingDetails: {
        chunksAnalyzed: 6,
        retrievalMethod: 'Dense + Sparse',
        rerankerScore: 0.87,
        processingTime: 3.8,
      },
    },
  },
];
