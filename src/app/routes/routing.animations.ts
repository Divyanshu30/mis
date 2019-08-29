import { trigger, transition, style, animate } from '@angular/animations';

export const routeAnimationTrigger = trigger('routeAnimationState', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(500)
    ])
])