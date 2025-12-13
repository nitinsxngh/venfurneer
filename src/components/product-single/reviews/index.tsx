import type { ProductType } from "@/types";

import Punctuation from "./punctuation";
import ReviewsList from "./reviews-list";
import ReviewForm from "./review-form";

type ReviewsProductType = {
  show: boolean;
  product: ProductType;
};

const Reviews = ({ show, product }: ReviewsProductType) => {
  const style = {
    display: show ? "block" : "none",
  };

  // Safely get punctuation and reviews with defaults
  const punctuation = product.punctuation?.punctuation || 0;
  const countOpinions = product.punctuation?.countOpinions || 0;
  const reviews = product.reviews || [];

  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
        punctuation={punctuation}
        countOpinions={countOpinions}
      />
      
      <div className="product-single__reviews-content">
        <ReviewForm 
          productId={product.id || product._id || ""}
        />
        
        <ReviewsList reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;
