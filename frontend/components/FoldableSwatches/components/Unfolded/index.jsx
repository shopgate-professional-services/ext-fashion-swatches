import React, {
  useState, useEffect, useRef, useLayoutEffect, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';
import classnames from 'classnames';
import Swatch from '../../../Swatch';
import LabeledWrapper from './components/LabeledWrapper';
import { transitions } from '../../../styles';
import { swatchColorStyle, swatchSizeStyle } from '../../../../config';

const { pdp: colorStyle = {} } = swatchColorStyle;
const { pdp: sizeStyle = {} } = swatchSizeStyle;

const styles = {
  swatches: css({
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    overflow: 'scroll',
    maxWidth: '100%',
    display: 'flex',
    margin: '5px 0 4px 0',
    paddingLeft: 2,
    opacity: 0,
    transition: 'opacity 1.5s',
    boxShadow: 'none !important',
  }).toString(),
  withLabel: css({
    width: 'calc(100% - 16px)',
  }).toString(),
  selected: css({
    boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.7)',
  }).toString(),
  swatch: css({
    '&&': {
      height: 35,
      width: 35,
      marginRight: 20,
    },
  }).toString(),
  disabled: css({
    opacity: 0.1,
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const FoldableSwatchesUnfolded = ({
  values, onClick, highlight, label,
}) => {
  const [highlighted, setHighlighted] = useState(false);
  const [fade, setFade] = useState('');
  const ulRef = useRef(null);

  useEffect(() => {
    if (highlight) {
      setHighlighted(true);
    }
  }, [highlight]);

  useEffect(() => {
    setFade('fadeIn');
  }, []);

  useLayoutEffect(() => {
    if (ulRef.current) {
      const selected = values.findIndex(v => !!v.selected);
      ulRef.current.scrollLeft = selected * 55;
    }
  }, [values, label]);

  const Wrapper = label ? LabeledWrapper : Fragment;

  return (
    <Transition
      in={highlighted}
      timeout={500}
      onEntered={() => setHighlighted(false)}
    >
      {state => (
        <Wrapper label={label}>
          <ul
            className={classnames(
              styles.swatches,
              transitions[state],
              transitions[fade]
            )}
            ref={ulRef}
          >
            {values.map(value => (
              <Swatch
                key={value.id}
                tagName="li"
                style={{
                  ...value.swatchColor && {
                    background: value.swatchColor,
                    ...colorStyle.default,
                    ...value.selected && colorStyle.selected,
                    ...!value.selectable && colorStyle.disabled,
                  },
                  ...value.swatchLabel && {
                    ...sizeStyle.default,
                    ...value.selected && sizeStyle.selected,
                    ...!value.selectable && sizeStyle.disabled,
                  },
                }}
                className={classnames({
                  [styles.selected]: value.selected,
                  [styles.disabled]: !value.selectable,
                }, styles.swatch)}
                onClick={() => onClick(value)}
              >
                {value.swatchLabel}
              </Swatch>
            ))}
          </ul>
        </Wrapper>
      )}
    </Transition>
  );
};

FoldableSwatchesUnfolded.propTypes = {
  onClick: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  highlight: PropTypes.bool,
  label: PropTypes.string,
};

FoldableSwatchesUnfolded.defaultProps = {
  highlight: false,
  label: null,
};

export default FoldableSwatchesUnfolded;
