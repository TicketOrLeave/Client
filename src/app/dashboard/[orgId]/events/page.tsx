import { RedirectType, permanentRedirect } from "next/navigation";

export default async function page({ params: { orgId } }: { params: { orgId: string } }) {
    permanentRedirect(`/dashboard/${orgId}/`, RedirectType.replace)
}