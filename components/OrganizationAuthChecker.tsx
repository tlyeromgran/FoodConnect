// With Clerk removed there are no organizations; the demo user counts as an "Owners" member,
// and middleware.ts already keeps signed-out visitors away from this page.
const OrganizationAuthChecker = () => null;

export default OrganizationAuthChecker;
