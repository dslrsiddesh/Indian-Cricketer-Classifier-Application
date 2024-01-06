import PropTypes from 'prop-types';

const Card = ({ image }) => {
  return (
    <div>
      <img className='card-image' src={image.url} alt={image.title} />
      <p>{image.title}</p>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
