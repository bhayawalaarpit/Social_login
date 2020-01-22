import { NotifierConfig } from 'angular-notifier/esm5/lib/models/notifier-config.model.js';

export const notifierConfig: NotifierConfig = {
    theme: 'material',
    position: {
        horizontal: { position: 'right', distance: 12 },
        vertical: { position: 'top', distance: 94, gap: 10 }
    },
    behaviour: {
        autoHide: 6000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: { preset: 'slide', speed: 300, easing: 'ease' },
        hide: { preset: 'fade', speed: 300, easing: 'ease', offset: 50 },
        shift: { speed: 300, easing: 'ease' },
        overlap: 150
    }
};

