export const validateEmail = (email: string) => {
	return {
		validator: (email: string) => {
			var match = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			return (match.test(email));
		},
		message: 'Email must in valid format.'
	};
};