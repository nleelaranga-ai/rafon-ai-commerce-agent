from fastapi import APIRouter, HTTPException

from app.schemas.product import Product
from app.services.product_service import get_all_products, get_product


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.get("", response_model=list[Product])
def list_products() -> list[Product]:
    return get_all_products()


@router.get("/{product_id}", response_model=Product)
def product_detail(product_id: str) -> Product:
    product = get_product(product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product
