import React, { useState } from 'react';
import { sanitizeWithExceptionsForVideos } from '../../../../../utils/data-processing/sanitize';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { suggestQuote } from '../../../../../redux/actions/quote';

const AddQuoteForm = ({ suggestQuote, tellResult }) => {
  const initialForm = {
    quote: '',
    name: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const { name, quote } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: sanitizeWithExceptionsForVideos(event.target.value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    suggestQuote(formData)
      .then((response) => {
        tellResult(response);
      })
      .then(setFormData(initialForm));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="label-for-quote" htmlFor="quote">
          Tu as un micro-vécu à partager&nbsp;? Nous serons ravi·e·s de le lire et de le publier.
          <textarea
            name="quote"
            value={quote}
            onChange={handleChange}
            placeholder="Il était une fois..."
            required
          />
        </label>
        <label className="label-for-name" htmlFor="name">
          Ton pseudo&nbsp;?
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Captain Ann O'nymous"
          />
        </label>
        <input type="submit" value="Partager" className="basic-button" />
      </form>
    </div>
  );
};

AddQuoteForm.propTypes = {
  suggestQuote: PropTypes.func.isRequired,
  tellResult: PropTypes.func.isRequired,
};

export default connect(null, { suggestQuote })(AddQuoteForm);
