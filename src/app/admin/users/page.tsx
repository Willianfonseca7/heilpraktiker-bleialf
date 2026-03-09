"use client"

import { useEffect, useState } from "react"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function loadUsers() {
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function createAdmin(e: any) {
    e.preventDefault()

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    setEmail("")
    setPassword("")
    loadUsers()
  }

  async function toggleUser(id: string, active: boolean) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isActive: !active })
    })

    loadUsers()
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <h1 className="text-2xl font-semibold mb-6">
        Admin Verwaltung
      </h1>

      <form onSubmit={createAdmin} className="flex gap-2 mb-8">
        <input
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4">
          Admin erstellen
        </button>
      </form>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {users.map((u)=>(
            <tr key={u.id} className="border-t">

              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? "Active" : "Disabled"}</td>

              <td>
                <button
                  onClick={()=>toggleUser(u.id,u.isActive)}
                  className="text-sm text-blue-600"
                >
                  {u.isActive ? "Disable" : "Activate"}
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}