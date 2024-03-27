import { Session, getServerSession } from 'next-auth'
import Image from 'next/image'
import { IUser } from '@/types'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { DropdownMenuActions } from './DropDwonMenuActions'
import InviteUserModal from './InviteUsermodal'

export async function TeamTable({ members, orgId }: { members: IUser[], orgId:string }) {
  const session = await getServerSession()
  const user = members.find((member) => member.email === session?.user?.email)
  const isAdmin = user?.role == 'admin' || user?.role == 'creator'
  const isOwner = user?.role == 'creator'
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 h-full">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Team</h1>
        
        <InviteUserModal orgId={orgId} />
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              {isAdmin && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <Member key={member.id} member={member} isAdmin={isAdmin} user={session?.user} orgId={orgId} />
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

function Member({
  member,
  isAdmin,
  user,
  orgId,
}: {
  member: IUser
  isAdmin: boolean
  user: Session['user']
  orgId: string
}) {
  return (
    <TableRow>
      <TableCell>
        <Image
          alt="Avatar"
          className="rounded-full object-cover"
          height="40"
          src={member.image_url}
          style={{
            aspectRatio: '40/40',
            objectFit: 'cover',
          }}
          width="40"
        />
      </TableCell>
      <TableCell className="font-semibold">{member.name}</TableCell>
      <TableCell>{member.role}</TableCell>
      {isAdmin && user?.email !== member.email &&
        <TableCell>
          <DropdownMenuActions role={member.role!} memberId={member.id} orgId={orgId} />
        </TableCell>
      }
    </TableRow>
  )
}
