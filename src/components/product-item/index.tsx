import { some } from "lodash";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { toggleFavProduct } from "@/store/reducers/user";

interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  currentPrice: number;
  discount?: number;
  images: string[];
}

const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
}: ProductItemProps) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      }),
    );
  };

  // Format price for INR display
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart" />
        </button>

        <Link href={`/product/${id}`}>
          <img 
            src={images ? images[0] : ""} 
            alt={`${name} - Premium luxury scent diffuser from venfurneer`}
            loading="lazy"
          />
          {discount && discount > 0 && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>
      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={`product__price ${discount && discount > 0 ? "product__price--discount" : ""}`}
        >
          <h4>₹{formatPrice(currentPrice)}</h4>
          {discount && discount > 0 && (
            <span className="original-price">₹{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
