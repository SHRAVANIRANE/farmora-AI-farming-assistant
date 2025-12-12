// diagnosisHelpers.js
export function severityLabel(conf) {
  const p = Math.round(conf * 100);
  if (p >= 85) return "Severe";
  if (p >= 60) return "Moderate";
  if (p >= 40) return "Mild";
  return "Low";
}

const RECOMMENDATIONS = {
  Tomato___Leaf_Mold:
    "Apply appropriate fungicide (copper-based). Avoid overhead irrigation.",
  Potato___Late_blight:
    "Use systemic fungicide immediately and remove affected leaves.",
  Apple___Black_rot: "Prune infected tissue; apply recommended fungicide.",
  // add more mappings for common labels...
};

export function getRecommendation(label) {
  return (
    RECOMMENDATIONS[label] ||
    "Monitor closely. Consider expert advice or test with field kit."
  );
}
