import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Fade from 'react-reveal/Fade';

import './ModernWorld.css';

import { getAllArticlesInfos } from '../../../../redux/actions/article';
import { WORLDS } from '../../../../dictionnary/worlds';
import SwipeDoor from '../../../elements/swipe/swipe-door/SwipeDoor';
import AllArticlesOfTheWorld from '../../../elements/article/all-articles/AllArticlesOfTheWorld';
import Lab from '../../../elements/lab/Lab';
import { SLACK } from '../../../../dictionnary/externalElectronicTalesLinks';
import { MODERN_WORLD_IMAGES_PATH } from '../../../../dictionnary/internalImagesPathes';
import RoadmapDoor from '../../../elements/roadmap/roadmap-door/RoadmapDoor';

const ModernWorld = ({ articles, getAllArticlesInfos }) => {
  useEffect(() => {
    getAllArticlesInfos(WORLDS.MODERN_WORLD);
  }, []);

  return (
    <Fade duration={1500}>
      <div id="modern-world" className="world-page container">
        <div className="line-title-wrapper world-title-wrapper">
          <h2 className="world-title neon flicker">Modern World</h2>
        </div>
        <Lab
          text="Retrouve ici des contenus d'Electronic Tales à venir. Pour participer à leur création, clique dessus&nbsp;: tu seras emmené·e vers notre Slack, the place to be du pool de co-création&nbsp;!"
          cards={[
            {
              _id: 'salaryCardId',
              title: 'Le mur des salaires des devs juniors : partageons les vrais chiffres !',
              link: {
                path: SLACK,
                openInNewTab: true,
              },
              thumbnail: process.env.PUBLIC_URL + MODERN_WORLD_IMAGES_PATH + 'money-small.jpg',
            },
            {
              _id: 'tamagotchiCardId',
              title:
                'Le tamagotchi des devs : tracke tes progrès et compare-les à ceux des autres en toute bienveillance',
              link: {
                path: SLACK,
                openInNewTab: true,
              },
              thumbnail: process.env.PUBLIC_URL + MODERN_WORLD_IMAGES_PATH + 'tamagotchi-small.jpg',
            },
          ]}
        />
        <SwipeDoor
          id={WORLDS.MODERN_WORLD}
          link="/modern-world/too-late-to-ask"
          text="Toi aussi, tu te poses encore des questions de programmation dont tu devrais déjà connaître les
        réponses&nbsp;?"
        />
        <RoadmapDoor />
        <AllArticlesOfTheWorld articles={articles} />
      </div>
    </Fade>
  );
};

ModernWorld.propTypes = {
  articles: PropTypes.array.isRequired,
  getAllArticlesInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.article.allArticles,
});

export default connect(mapStateToProps, { getAllArticlesInfos })(ModernWorld);
