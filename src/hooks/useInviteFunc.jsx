/** @format */

export const useInviteFunc = () => {
	const useConvertText = (text) => {
		if (!text) return null;

		return text?.split('\n').map((line) => (
			<>
				{line}
				<br />
			</>
		));
	};

	return { useConvertText };
};
