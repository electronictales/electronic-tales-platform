import React, { useState } from 'react';
import { sanitize } from '../../../../../utils/data-processing/sanitize';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import { suggestTLTA } from '../../../../../redux/actions/tooLateToAsk';

const AddTLTAForm = ({ suggestTLTA, tellResult }) => {
  const initialForm = {
    question: '',
    simpleDefinition: '',
    analogy: '',
    realWorldExample: '',
    name: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const [iHaveAnswer, setIHaveAnswer] = useState(false);

  const { question, simpleDefinition, analogy, realWorldExample, name } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: sanitize(event.target.value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    suggestTLTA(formData)
      .then((response) => {
        tellResult(response);
      })
      .then(setFormData(initialForm));
  };

  const handleIHaveAnswerChange = () => {
    setIHaveAnswer(!iHaveAnswer);
  };

  return (
    <div className="form-container">
      <h3 className="neon">Je me suis toujours demandé...</h3>
      <p>
        {' '}
        Toi aussi, tu as une question que tu n'oses plus poser parce que tu es censé·e déjà
        connaître la réponse&nbsp;?
        <br />
        <br />
        N'hésite plus et partage-la&nbsp;!
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">
          Ta question (obligatoire)&nbsp;:
          <textarea
            name="question"
            value={question}
            onChange={handleChange}
            placeholder="Écris ta question ici."
            required
          />
        </label>
        {/* For design, see : http://aaronshaf.github.io/react-toggle/ */}
        <label className="toggle-label">
          <span style={{ fontWeight: iHaveAnswer ? '400' : '700' }}>
            Je veux que la team d'Electronic Tales réponde
          </span>
          <Toggle
            defaultChecked={iHaveAnswer}
            className="custom-toggle"
            onChange={handleIHaveAnswerChange}
            icons={{
              checked: '',
              unchecked: '',
            }}
          />
          <span style={{ fontWeight: iHaveAnswer ? '700' : '400' }}>
            Je veux proposer une réponse
          </span>
        </label>
        <div className={iHaveAnswer ? '' : 'optional-input-is-not-visible'}>
          <label htmlFor="simpleDefinition">
            Tu as une définition simple&nbsp;? <br />
            Super&nbsp;! Écris-la ici&nbsp;:
            <textarea
              name="simpleDefinition"
              value={simpleDefinition}
              onChange={handleChange}
              placeholder="Exemple&nbsp;: En fait, c'est juste une façon de..."
            />
          </label>
          {/* <label htmlFor="simpledef">
            Tu
            <textarea
              name="simpledef"
              value={simpleDefinition}
              onChange={handleChange}
              placeholder="Exemple..."
            />
          </label> */}
          <label htmlFor="analogy">
            Si tu as une analogie ou une métaphore, c'est par là&nbsp;:
            <textarea
              name="analogy"
              value={analogy}
              onChange={handleChange}
              placeholder="Exemple&nbsp;: C'est comme dans un restaurant où il y aurait..."
            />
          </label>
          <label htmlFor="realWorldExample">
            Un petit exemple concret, pour finir&nbsp;? Go&nbsp;:
            <textarea
              name="realWorldExample"
              value={realWorldExample}
              onChange={handleChange}
              placeholder='Exemple&nbsp;: Pour afficher "J&apos;aime Electronic Tales" sur mon écran, je peux taper...'
            />
          </label>
        </div>
        <label htmlFor="name">
          Ton petit nom&nbsp;?
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Captain Anonymouse"
            id="leave-a-name"
          />
        </label>
        <input type="submit" value="Partager" className="basic-button" />
      </form>
    </div>
  );
};

AddTLTAForm.propTypes = {
  tellResult: PropTypes.func.isRequired,
};

export default connect(null, { suggestTLTA })(AddTLTAForm);
