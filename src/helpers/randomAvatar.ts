export default function randomAvatar(email: string) {
  return 'https://robohash.org/' + email + '.png?size=128x128&set=set4';
}
