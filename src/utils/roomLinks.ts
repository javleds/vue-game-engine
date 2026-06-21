export function publicInviteUrl(roomId: string, origin: string = window.location.origin): string {
  return absoluteUrl(`/join/${encodeURIComponent(roomId)}`, origin)
}

export function privateReconnectUrl(
  roomId: string,
  playerId: string,
  token: string,
  origin: string = window.location.origin,
): string {
  const query = new URLSearchParams({
    player: playerId,
    token,
  })

  return absoluteUrl(`/rooms/${encodeURIComponent(roomId)}/resume?${query.toString()}`, origin)
}

function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).toString()
}
