
export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const pricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    price: "0",
    features: [
      "5 AI Interview Sessions",
      "Basic Performance Analysis",
      "Standard Question Bank",
      "Email Support",
      "Practice Session History"
    ],
    buttonText: "Start Free"
  },
  {
    title: "Professional",
    price: "29",
    features: [
      "Unlimited AI Interview Sessions",
      "Advanced Performance Analytics",
      "Industry-specific Questions",
      "Custom Interview Scenarios",
      "Priority Support",
      "Resume Review Assistant",
      "Interview Recording"
    ],
    isPopular: true
  },
  {
    title: "Enterprise",
    price: "99",
    features: [
      "Everything in Professional",
      "Multiple User Accounts",
      "Team Analytics Dashboard",
      "Custom Question Database",
      "Dedicated Account Manager",
      "API Access",
      "White-labeling Options",
      "Custom Integration Support"
    ],
    buttonVariant: "outline",
    buttonText: "Contact Sales"
  }
];
