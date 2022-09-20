import { useNotes } from "../hooks/useNotes"
import Notification from './Notification'

export default function Notifications() {
  const { notifications } = useNotes()

  return (
      <div className="absolute right-1 w-[90%] md:w-[40%] overflow-y-auto overflow-x-auto max-h-screen z-[50]">
        {notifications.map((note) => <Notification key={note.id} note={note}/> )}
      </div>
  )
}
