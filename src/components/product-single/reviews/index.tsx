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

  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
        punctuation={product.punctuation.punctuation}
        countOpinions={product.punctuation.countOpinions}
      />
      
      <div className="product-single__reviews-content">
        <ReviewForm 
          productId={product.id || product._id || ""}
        />
        
        <ReviewsList reviews={product.reviews} />
      </div>
    </section>
  );
};

export default Reviews;
