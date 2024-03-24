import Image from 'next/image'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { Button } from '../ui/button'
import { IUser } from '@/types'
import { Session, getServerSession } from 'next-auth'
import { DropdownMenuActions } from './Team/DropDwonMenuActions'
// import InviteUserModal from './Team/InviteUsermodal'

export async function TeamTable({ members, orgId }: { members: IUser[], orgId:string }) {
  const session = await getServerSession()
  const user = members.find((member) => member.email === session?.user?.email)
  const isAdmin = user?.role == 'admin' || user?.role == 'creator'
  const isOwner = user?.role == 'creator'
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 h-full">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Team</h1>
        
        {/* <InviteUserModal orgId={orgId} /> */}
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
              <Member key={member.id} name={member.name} image_url={member.image_url} role={member.role || 'admin'} isAdmin={isAdmin} email={member.email} user={session?.user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

function Member({
  name,
  image_url,
  role,
  isAdmin,
  email,
  user,
}: {
  name: string
  image_url: string
  role: string
  isAdmin: boolean
  email: string
  user: Session['user']
}) {
  return (
    <TableRow>
      <TableCell>
        <Image
          alt="Avatar"
          className="rounded-full object-cover"
          height="40"
          src={image_url}
          style={{
            aspectRatio: '40/40',
            objectFit: 'cover',
          }}
          width="40"
        />
      </TableCell>
      <TableCell className="font-semibold">{name}</TableCell>
      <TableCell>{role}</TableCell>
      {isAdmin && user?.email !== email &&
        <TableCell>
          <DropdownMenuActions role={role} />
        </TableCell>
      }
    </TableRow>
  )
}
