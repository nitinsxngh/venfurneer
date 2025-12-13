import { useState } from "react";
import { useRouter } from "next/router";
import Rater from "react-rater";

type ReviewFormProps = {
  productId: string;
  onReviewSubmitted?: () => void;
};

const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/product/${productId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setName("");
      setRating(0);
      setComment("");
      setSuccess(true);

      // Callback to refresh reviews
      if (onReviewSubmitted) {
        onReviewSubmitted();
      } else {
        // Refresh the page to show new review
        router.replace(router.asPath);
      }

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      
      {success && (
        <div className="review-form__success">
          Thank you! Your review has been submitted successfully.
        </div>
      )}

      {error && (
        <div className="review-form__error">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="review-form__form">
        <div className="review-form__field">
          <label htmlFor="review-name">Your Name *</label>
          <input
            type="text"
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={submitting}
            required
          />
        </div>

        <div className="review-form__field">
          <label>Rating *</label>
          <div className="review-form__rating">
            <Rater
              total={5}
              rating={rating}
              interactive={true}
              onRate={({ rating }: { rating: number }) => setRating(rating)}
            />
            {rating > 0 && (
              <span className="review-form__rating-text">
                {rating} out of 5 stars
              </span>
            )}
          </div>
        </div>

        <div className="review-form__field">
          <label htmlFor="review-comment">Your Review *</label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
            disabled={submitting}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

