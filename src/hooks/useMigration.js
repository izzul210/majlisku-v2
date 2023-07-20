/** @format */

export const useGuestlistMigration = () => {
	const migrateGroup = (groups, group) => {
		if (groups) return groups;
		else return [group];
	};

	return {
		migrateGroup,
	};
};
