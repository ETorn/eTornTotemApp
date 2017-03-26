import {trigger, state, animate, style, transition, AnimationEntryMetadata} from '@angular/core';

export function customTransition():AnimationEntryMetadata {
  return slideOutAndIn();
}

function slideOutAndIn():AnimationEntryMetadata {
  return trigger('customTransition', [
    transition(
    ':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('200ms', style({transform: 'translateX(0)',opacity: 1}))
    ]
    ),
    transition(
    ':leave', [
        style({transform: 'translateX(0)', 'opacity': 1}),
        animate('200ms', style({transform: 'translateX(-100%)',opacity: 0}),
        )
    ]
    )]);
}