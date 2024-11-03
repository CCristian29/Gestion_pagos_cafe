def calculate_payment(kg: float, price_per_kg: float) -> float:
    """Calculate the payment for harvested coffee."""
    return round(kg * price_per_kg, 2)