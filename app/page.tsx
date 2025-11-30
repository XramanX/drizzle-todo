import { db, todos } from "./db/client";
import { createTodo, deleteTodo, updateTodo } from "./actions/todos";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await db.query.todos.findMany({
    orderBy: (fields, operators) => operators.desc(fields.createdAt),
  });

  const total = items.length;

  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,#22c55e22,transparent_55%),radial-gradient(circle_at_bottom,#0ea5e933,transparent_55%)] text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Todo Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-200">
              {total === 0
                ? "No tasks yet"
                : `${total} task${total > 1 ? "s" : ""}`}
            </span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-[0_18px_45px_rgba(15,23,42,0.7)] backdrop-blur-sm overflow-hidden">
          <div className="border-b border-slate-800/80 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-sm font-medium text-slate-200">
                Add a new task
              </h2>
              <span className="text-[11px] uppercase tracking-wide text-slate-500">
                CRUD · Create
              </span>
            </div>

            <form
              action={createTodo}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                name="title"
                placeholder="e.g. Implement Drizzle CRUD with Next.js"
                className="flex-1 rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 transition"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-2 py-1 hover:cursor-pointer text-sm font-medium text-emerald-950 shadow-sm shadow-emerald-500/40 transition hover:bg-emerald-400 hover:shadow-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span className="text-2xl align-middle justify-center">＋</span>
              </button>
            </form>
          </div>

          <div className="p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/60 px-4 py-10 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/60 text-lg">
                  📝
                </div>
                <p className="text-sm font-medium text-slate-200">
                  No todos yet
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Start by adding your first task above.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                  <span>CRUD · Read / Update / Delete</span>
                  <span>
                    {total} item{total > 1 ? "s" : ""}
                  </span>
                </div>

                <ul className="space-y-3">
                  {items.map((todo) => (
                    <li
                      key={todo.id}
                      className="group flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 sm:px-4 sm:py-3 transition hover:border-emerald-500/50 hover:bg-slate-900"
                    >
                      <form
                        action={updateTodo.bind(null, todo.id)}
                        className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center"
                      >
                        <input
                          name="title"
                          defaultValue={todo.title}
                          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 transition"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-xl border hover:cursor-pointer border-emerald-500/70 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                          >
                            Save
                          </button>
                        </div>
                      </form>

                      <form action={deleteTodo.bind(null, todo.id)}>
                        <button
                          type="submit"
                          className="mt-1 hover:cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/50 bg-red-500/5 text-xs font-medium text-red-300 opacity-70 transition hover:bg-red-500/15 hover:opacity-100"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
