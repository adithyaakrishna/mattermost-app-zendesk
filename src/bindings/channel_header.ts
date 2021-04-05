import {AppBinding} from 'mattermost-redux/types/apps';
import {AppExpandLevels} from 'mattermost-redux/constants/apps';

import {ZDIcon, Routes, newChannelHeaderBindings} from '../utils';
import {CommandLocations} from '../utils/constants';

// getChannelHeaderBindings returns the users command bindings
export const getChannelHeaderBindings = (configured: boolean, connected: boolean, sysadmin: boolean): AppBinding => {
    const bindings: AppBinding[] = [];

    // only show configuration option if admin has not configured the plugin
    if (!configured && sysadmin) {
        bindings.push(channelHeaderConfig());
        return newChannelHeaderBindings(bindings);
    }

    if (connected) {
        bindings.push(channelHeaderSubscribe());
    }
    return newChannelHeaderBindings(bindings);
};

const channelHeaderSubscribe = (): AppBinding => {
    return {
        location: CommandLocations.Subscribe,
        label: 'Create Zendesk Subscription',
        description: 'Open Create Zendesk Subscription Modal',
        icon: ZDIcon,
        call: {
            path: Routes.App.CallPathSubsOpenForm,
            expand: {
                acting_user: AppExpandLevels.EXPAND_ALL,
            },
        },
    } as AppBinding;
};

const channelHeaderConfig = (): AppBinding => {
    return {
        location: CommandLocations.Configure,
        label: 'Configure Zendesk',
        description: 'Open Create Zendesk Config Modal',
        icon: ZDIcon,
        call: {
            path: Routes.App.CallPathConfigOpenForm,
            expand: {
                acting_user: AppExpandLevels.EXPAND_ALL,
            },
        },
    } as AppBinding;
};