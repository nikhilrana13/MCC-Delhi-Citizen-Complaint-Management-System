

export const getCitizenRoomId = (citizenId) => {
  if (!citizenId) return null;
  return typeof citizenId === "object"
    ? citizenId._id.toString()
    : citizenId.toString();
};