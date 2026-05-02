interface LogoConfig {
  bg: string;
  fg: string;
  mark: string;
}

const LOGOS: Record<string, LogoConfig> = {
  Google:     { bg: '#FEF3C7', fg: '#B45309',  mark: 'G'  },
  Meta:       { bg: '#DBEAFE', fg: '#1D4ED8',  mark: 'M'  },
  Apple:      { bg: '#F3F4F6', fg: '#111827',  mark: ''   },
  Amazon:     { bg: '#FEF3C7', fg: '#92400E',  mark: 'a'  },
  Netflix:    { bg: '#FEE2E2', fg: '#B91C1C',  mark: 'N'  },
  Microsoft:  { bg: '#DBEAFE', fg: '#1E40AF',  mark: ''   },
  Stripe:     { bg: '#EDE9FE', fg: '#6D28D9',  mark: 'S'  },
  Airbnb:     { bg: '#FCE7F3', fg: '#BE185D',  mark: 'A'  },
  Notion:     { bg: '#F3F4F6', fg: '#111827',  mark: 'N'  },
  Figma:      { bg: '#FEE2E2', fg: '#DC2626',  mark: 'F'  },
  Linear:     { bg: '#E0E7FF', fg: '#3730A3',  mark: 'L'  },
  Vercel:     { bg: '#F3F4F6', fg: '#111827',  mark: '▲'  },
  OpenAI:     { bg: '#D1FAE5', fg: '#065F46',  mark: '◯'  },
  Anthropic:  { bg: '#FED7AA', fg: '#9A3412',  mark: '✦'  },
  Shopify:    { bg: '#D1FAE5', fg: '#065F46',  mark: 'S'  },
  Discord:    { bg: '#E0E7FF', fg: '#4338CA',  mark: 'D'  },
  Spotify:    { bg: '#D1FAE5', fg: '#065F46',  mark: '♪'  },
  Uber:       { bg: '#F3F4F6', fg: '#111827',  mark: 'U'  },
  Databricks: { bg: '#FEE2E2', fg: '#B91C1C',  mark: 'db' },
  Snowflake:  { bg: '#DBEAFE', fg: '#1E40AF',  mark: '❄'  },
};

interface CompanyLogoProps {
  company: string;
  size?: number;
}

export default function CompanyLogo({ company, size = 36 }: CompanyLogoProps) {
  const conf = LOGOS[company] ?? { bg: '#F3F4F6', fg: '#111827', mark: company.charAt(0) };
  return (
    <div
      className="rounded-lg flex items-center justify-center font-semibold flex-shrink-0 select-none"
      style={{
        width: size,
        height: size,
        background: conf.bg,
        color: conf.fg,
        fontSize: size * 0.42,
        letterSpacing: '-0.02em',
      }}
      aria-label={company}
    >
      {conf.mark || company.charAt(0)}
    </div>
  );
}
