from app.schemas.product import Product


PRODUCTS = [
    Product(
        id="nothing-ear-a",
        name="Nothing Ear (a) TWS",
        category="Audio",
        price=5499,
        original_price=7999,
        match_score=98.6,
        specs=[
            "45ms Low Latency Gaming Mode",
            "45dB Smart ANC",
            "42.5 hrs battery",
        ],
        icon="headphones",
    ),
    Product(
        id="realme-buds-pro",
        name="Realme Buds Air 5 Pro",
        category="Audio",
        price=4999,
        original_price=6999,
        match_score=94.4,
        specs=[
            "40ms Low Latency",
            "Hi-Res LDAC Codec",
            "50dB Deep ANC",
        ],
        icon="volume-2",
    ),
    Product(
        id="boat-immortal-131",
        name="boAt Immortal 131 Gaming",
        category="Audio",
        price=1499,
        original_price=3490,
        match_score=92.1,
        specs=[
            "BEAST Mode 40ms",
            "RGB Gaming LEDs",
            "40 hrs battery",
        ],
        icon="gamepad-2",
    ),
    Product(
        id="fast-charger-65w",
        name="65W GaN Fast Charger",
        category="Charging",
        price=1199,
        original_price=1699,
        match_score=96.2,
        specs=[
            "GaN Ultra Compact",
            "Dual USB-C 65W PD",
            "Laptop & Phone compatible",
        ],
        icon="zap",
    ),
    Product(
        id="samsung-power-bank",
        name="Samsung 20,000mAh Power Bank",
        category="Charging",
        price=2299,
        original_price=3499,
        match_score=95.0,
        specs=[
            "25W Super Fast Charging",
            "Triple-Port Output",
            "Aircraft Approved",
        ],
        icon="battery-charging",
    ),
    Product(
        id="pixel-case",
        name="Pixel Ultra-Grip Armor Case",
        category="Protection",
        price=799,
        original_price=1299,
        match_score=91.8,
        specs=[
            "10ft Drop Protection",
            "MagSafe Ring Integrated",
            "Matte Carbon Finish",
        ],
        icon="shield",
    ),
    Product(
        id="extended-warranty",
        name="2-Year Extended Device Care",
        category="Protection",
        price=499,
        original_price=999,
        match_score=99.0,
        specs=[
            "Accidental Drop Coverage",
            "Liquid Spill Protection",
            "Instant Claim via WhatsApp",
        ],
        icon="shield-check",
    ),
]


def get_all_products() -> list[Product]:
    return PRODUCTS


def get_product(product_id: str) -> Product | None:
    return next(
        (product for product in PRODUCTS if product.id == product_id),
        None,
    )
