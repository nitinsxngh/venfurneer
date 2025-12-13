import Rater from "react-rater";

type PunctuationProps = {
  punctuation: number;
  countOpinions: number;
};

const Punctuation = ({
  punctuation,
  countOpinions,
}: PunctuationProps) => {
  return (
    <div className="product-punctuation-simple">
      <div className="product-punctuation-simple__rating">
        <Rater total={5} interactive={false} rating={punctuation} />
        <span className="product-punctuation-simple__value">
          {punctuation.toFixed(1)} out of 5
        </span>
      </div>
      {countOpinions > 0 && (
        <p className="product-punctuation-simple__count">
          Based on {countOpinions} {countOpinions === 1 ? 'review' : 'reviews'}
        </p>
      )}
    </div>
  );
};

export default Punctuation;
