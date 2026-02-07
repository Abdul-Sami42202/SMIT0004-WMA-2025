function formatIngredient(ing) {
  if (!ing) return "";
  const parts = [ing.quantity, ing.unit, ing.description].filter(Boolean);
  return parts.join(" ").trim() || ing.description || "";
}
export default formatIngredient;
