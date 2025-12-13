import Rater from "react-rater";

import type { ReviewType } from "@/types";
import createMarkup from "@/utils/markup";

type ReviewsListType = {
  reviews: ReviewType[];
};

const ReviewsList = ({ reviews }: ReviewsListType) => {
  const getAvatarUrl = (review: ReviewType) => {
    if (review.avatar && review.avatar.trim() !== '') {
      return review.avatar;
    }
    // Generate dummy avatar with initials
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&color=fff&size=128`;
  };

  return (
    <section className="reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review__avatar">
            <img src={getAvatarUrl(review)} alt={review.name} onError={(e) => {
              // Fallback to default dummy avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=6366f1&color=fff&size=128`;
            }} />
          </div>

          <div className="review__content">
            <h3>{review.name}</h3>
            <Rater total={5} interactive={false} rating={review.punctuation} />
            <div
              className="review__comment"
              dangerouslySetInnerHTML={createMarkup(review.description)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewsList;
