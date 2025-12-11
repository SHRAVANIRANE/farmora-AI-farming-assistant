import React from "react";
import Card from "./Card";

const InfoSection = () => {
  return (
    <div>
      <section className="py-16 bg-green-100 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-20">
          What Krishi Mitra Offers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <Card
            emoji="🌱"
            title="AI-Powered Detection"
            description="Upload images of your crops for instant disease analysis. Identify plant diseases with 94% accuracy and visualize infection locations."
          />
          <Card
            emoji="💰"
            title="Cost-Saving Calculator"
            description="Understand potential savings by comparing treatment costs versus alternative methods. Make informed decisions to optimize expenses."
          />
          <Card
            emoji="📊"
            title="Detailed Visualizations"
            description="Get clear visual representations of disease spread and severity. Understand the impact and plan effective treatment strategies."
          />
          <Card
            emoji="🔍"
            title="Quick Diagnosis"
            description="Receive rapid analysis results to address crop health issues promptly and minimize damage."
          />
          <Card
            emoji="🌾"
            title="Crop Health Management"
            description="Monitor and manage the health of your crops effectively using our AI simulator."
          />
          <Card
            emoji="📈"
            title="Yield Improvement"
            description="Implement timely interventions based on AI insights to improve productivity and profitability."
          />
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
