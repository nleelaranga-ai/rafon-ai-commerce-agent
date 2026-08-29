from app.schemas.product import Product
from app.services.product_service import (
    get_all_products,
    get_product,
)


def build_catalog_for_ai() -> list[dict]:
    products = get_all_products()

    return [
        product.model_dump()
        for product in products
    ]


def validate_recommendation(
    product_id: str | None,
    budget: int | None,
) -> Product | None:
    if not product_id:
        return None

    product = get_product(product_id)

    if product is None:
        return None

    if budget is not None and product.price > budget:
        return None

    return product
