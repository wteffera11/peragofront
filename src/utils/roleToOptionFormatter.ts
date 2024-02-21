const roleToOptionFormatter = (
  roles: { id: number; name: string; description: string }[]
) => {
  const updatedRoles: any = roles.map(
    (role: { id: number; name: string; description: string }) => ({
      value: role.id.toString(),
      label: role.name,
    })
  );

  return updatedRoles;
};

export default roleToOptionFormatter;
