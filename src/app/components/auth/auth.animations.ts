import { trigger, style, animate, transition, state } from '@angular/animations';

export const routeSlideTrigger = trigger('routeSlideState', [
    state('startState', style({
        transform: 'translateX(0)'
    })),
    state('leaveState', style({
        transform: 'translateX(-200%)'
    })),
    transition('startState => leaveState', animate(500))
])

export const fadeInTrigger = trigger('fadeInState', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-10%)'
        }),
        animate('750ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ])
])

export const bounceInTrigger = trigger('bounceInState', [
    transition(':enter', [
        style({
            transform: 'scale(0)'
        }),
        animate(175, style({
            transform: 'scale(1.3)'
        })),
        animate(150, style({
            transform: 'scale(1)'
        }))
    ])
])

export const buttonValidTrigger = trigger('buttonValidState', [
    state('invalid', style({
        transform: 'scale(1)'
    })),
    state('valid', style({
        transform: 'scale(1)'
    })),
    transition('invalid => valid', [
        animate(125, style({
            transform: 'scale(1.1)'
        })),
        animate(250)
    ])
])