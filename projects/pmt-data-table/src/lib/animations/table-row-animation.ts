import { AnimationTriggerMetadata, trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const newRowsAnimation: AnimationTriggerMetadata  =
    trigger('newRowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate('.35s ease', style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate('.35s ease', style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
        /*
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
        */
      ])
    ]);

export const delRowsAnimation: AnimationTriggerMetadata  =
    trigger('delRowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate('.35s ease', style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate('.35s ease', style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]);

