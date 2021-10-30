import { store } from "react-notifications-component";

export const goodNotification = (title, message) => {
	store.addNotification({
		title: title,
		message: message,
		type: "success",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 2000,
			onScreen: false,
		},
	});
};

export const badNotification = (message) => {
	store.addNotification({
		title: "Something's wrong",
		message: message,
		type: "danger",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 2000,
			onScreen: false,
		},
	});
};
