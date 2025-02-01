import { atom } from 'recoil';

type AlertType = {
	isOpen: boolean;
	content: JSX.Element | string;
	callBack?: () => any;
};

export const alertState = atom<AlertType>({
	key: 'alertState',
	default: {
		isOpen: false,
		content: '',
	},
});
