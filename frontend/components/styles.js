import { css } from 'glamor';

const shake = css.keyframes({
  '10%, 90%': {
    transform: 'translate3d(-2px, 0, 0)',
  },
  '20%, 80%': {
    transform: 'translate3d(3px, 0, 0)',
  },
  '30%, 50%, 70%': {
    transform: 'translate3d(-5px, 0, 0)',
  },
  '40%, 60%': {
    transform: 'translate3d(5px, 0, 0)',
  },
});

export const transitions = {
  entering: css({
    animation: `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`,
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  }),
  fadeIn: css({
    opacity: '1 !important',
  }),
};
