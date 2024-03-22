import CreateEventForm from '@/components/Dashboard/Events/CreateEventForm'

export default function page({ params: { orgId } }: { params: { orgId: string } }) {
  return <CreateEventForm orgId={orgId} />
}
